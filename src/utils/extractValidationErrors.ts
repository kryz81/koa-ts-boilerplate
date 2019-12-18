import { ValidationError } from 'class-validator';

type ErrorMessage = { [key: string]: string };

export const extractValidationErrors = (errors: ReadonlyArray<ValidationError>): ErrorMessage =>
  errors.reduce(
    (result, error) => ({
      ...result,
      [error.property]: Object.values(error.constraints),
    }),
    {},
  );
