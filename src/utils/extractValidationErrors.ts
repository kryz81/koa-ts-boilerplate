type ErrorObject = Record<string, { message: string }>;
type ErrorMessage = { [key: string]: string };

export const extractValidationErrors = (errors: ErrorObject): ErrorMessage =>
  Object.keys(errors).reduce(
    (createdErrorsObject: ErrorMessage, currentError: string) => ({
      ...createdErrorsObject,
      [currentError]: errors[currentError].message,
    }),
    {},
  );
