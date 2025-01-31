import type { DefaultRole } from '@/data/types/roles.types';
import { database } from '@repo/database';

export const getRoleByKey = async (key: DefaultRole) => {
  const role = await database.role.findUnique({
    where: { key },
  });

  if (!role) {
    throw new Error(`Role with key '${key}' does not exist`);
  }

  return role;
};
