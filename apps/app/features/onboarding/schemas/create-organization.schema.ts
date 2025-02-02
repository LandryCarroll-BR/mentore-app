import { z } from 'zod';

export const createOrganizationSchema = z.object({
  organizationName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(32, { message: 'Name must be at most 32 characters' }),
});

export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
