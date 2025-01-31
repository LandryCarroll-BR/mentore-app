import { analytics } from '@repo/analytics/posthog/server';
import {
  type DeletedObjectJSON,
  type UserJSON,
  type WebhookEvent,
  clerkClient,
} from '@repo/auth/server';
import { database } from '@repo/database';
import { env } from '@repo/env';
import { log } from '@repo/observability/log';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

const handleUserCreated = async (data: UserJSON) => {
  const { id, email, firstName, lastName, createdAt, avatarUrl, phoneNumber } =
    getUserDataFromClerk(data);

  const clerk = await clerkClient();

  await clerk.users.updateUser(id, {
    publicMetadata: {
      role: 'user',
    },
  });

  await database.user.create({
    data: {
      id,
      email,
      firstName,
      lastName,
      createdAt,
      username: email,
      avatarUrl,
      phoneNumber,
    },
  });

  analytics.identify({
    distinctId: data.id,
    properties: {
      email,
      firstName,
      lastName,
      createdAt,
      avatarUrl,
      phoneNumber,
    },
  });

  analytics.capture({
    event: 'User Created',
    distinctId: data.id,
  });

  return new Response('User created', { status: 201 });
};

const handleUserUpdated = async (data: UserJSON) => {
  const { id, firstName, lastName } = getUserDataFromClerk(data);

  if (id) {
    await database.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
      },
    });
  }

  analytics.identify({
    distinctId: data.id,
    properties: {
      email: data.email_addresses.at(0)?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
      createdAt: new Date(data.created_at),
      avatar: data.image_url,
      phoneNumber: data.phone_numbers.at(0)?.phone_number,
    },
  });

  analytics.capture({
    event: 'User Updated',
    distinctId: data.id,
  });

  return new Response('User updated', { status: 201 });
};

const handleUserDeleted = async (data: DeletedObjectJSON) => {
  if (data.id) {
    analytics.identify({
      distinctId: data.id,
      properties: {
        deleted: new Date(),
      },
    });

    analytics.capture({
      event: 'User Deleted',
      distinctId: data.id,
    });

    await database.user.delete({
      where: {
        id: data.id,
      },
    });
  }

  return new Response('User deleted', { status: 201 });
};

const getUserDataFromClerk = (data: UserJSON) => {
  if (!data) {
    throw new Error('No data');
  }

  const id = data.id;
  if (!id) {
    throw new Error('No ID');
  }

  const email = data.email_addresses.at(0)?.email_address;
  if (!email) {
    throw new Error('No email address');
  }

  const createdAt = new Date(data.created_at);
  if (!createdAt) {
    throw new Error('No created at');
  }

  const firstName = data.first_name ?? email.split('@')[0];
  const lastName = data.last_name ?? '';
  const avatarUrl = data.image_url;
  const phoneNumber = data.phone_numbers.at(0)?.phone_number;

  return {
    id: data.id,
    email,
    firstName,
    lastName,
    createdAt,
    username: email,
    avatarUrl,
    phoneNumber,
  };
};

export const POST = async (request: Request): Promise<Response> => {
  if (!env.CLERK_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Not configured', ok: false });
  }

  console.log(request);

  // Get the headers
  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = (await request.json()) as object;
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const webhook = new Webhook(env.CLERK_WEBHOOK_SECRET);

  let event: WebhookEvent | undefined;

  // Verify the payload with the headers
  try {
    event = webhook.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    log.error('Error verifying webhook:', { error });
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = event.data;
  const eventType = event.type;

  console.log(eventType);

  log.info('Webhook', { id, eventType, body });

  let response: Response = new Response('', { status: 201 });

  switch (eventType) {
    case 'user.created': {
      response = await handleUserCreated(event.data);
      break;
    }
    case 'user.updated': {
      response = await handleUserUpdated(event.data);
      break;
    }
    case 'user.deleted': {
      response = await handleUserDeleted(event.data);
      break;
    }
    default: {
      break;
    }
  }

  await analytics.shutdown();

  return response;
};
