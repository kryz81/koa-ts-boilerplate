import { ValidationError } from 'class-validator';
import { extractValidationErrors } from '../extractValidationErrors';

it('creates an object with field names and errors array', () => {
  const validationErrors: ValidationError[] = [
    {
      property: 'role',
      constraints: { empty: 'Role cannot be empty', enum: 'Role must contain a value from enum' },
      children: [],
    },
    {
      property: 'name',
      constraints: { length: 'Name must contain at least 3 characters' },
      children: [],
    },
  ];

  const result = extractValidationErrors(validationErrors);

  expect(result).toEqual({
    role: ['Role cannot be empty', 'Role must contain a value from enum'],
    name: ['Name must contain at least 3 characters'],
  });
});
