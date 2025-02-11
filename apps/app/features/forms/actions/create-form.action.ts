import { formSchema } from '@/features/forms/schemas/form.schema';
import { authActionClient } from '@/lib/next-safe-action/next-safe-action.client';
import { database } from '@repo/database';

export const createFormAction = authActionClient
  .schema(
    formSchema.omit({
      id: true,
    })
  )
  .action(
    async ({ parsedInput: { title, description, steps }, ctx: { user } }) => {
      try {
        if (!user) {
          throw new Error('User is not authenticated.');
        }

        const organizationId = user.activeOrganizationId;

        if (!organizationId) {
          return {
            message: 'You must select an organization to create a form.',
          };
        }

        // Ensure the user is an admin in the given organization
        const isAdmin = await database.organizationUser.findFirst({
          where: {
            userId: user.id,
            organizationId,
            role: {
              key: 'ADMIN', // Ensure they have the admin role
            },
          },
        });

        if (!isAdmin) {
          return {
            message:
              'You are not authorized to create forms for this organization.',
          };
        }

        // Create the new form
        const form = await database.form.create({
          data: {
            name: title,
            description,
            isPublished: false, // Default to draft mode
            organizationForm: {
              create: {
                organizationId,
              },
            },
            steps: {
              create: steps.map((step, index) => ({
                stepOrder: index,
                title: step.title,
                description: step.description,
                fields: {
                  create: step.fields.map((field) => ({
                    label: field.title,
                    isRequired: field.required,
                  })),
                },
              })),
            },
          },
        });

        // Redirect to the form management page
        // redirect(`/dashboard/forms/${form.id}`);

        return { message: 'Form created successfully!' };
      } catch (error) {
        console.error('Error creating form:', error);
        return { message: 'Something went wrong. Please try again later.' };
      }
    }
  );
