import type { z } from 'zod';

export type InferFormKeys<T extends z.ZodType> = {
  [K in keyof z.infer<T>]: string;
};

export function createTypeSafeFormFields<T extends z.ZodType>(
  schema: T
): InferFormKeys<T> {
  return Object.keys(schema.shape).reduce(
    (acc, key) => {
      acc[key as keyof InferFormKeys<T>] = key;
      return acc;
    },
    {} as InferFormKeys<T>
  );
}
