import { generateId } from '../generateId';

it('generates an id', () => {
  expect(generateId().length).toBe(36);
  expect(generateId()).toMatch(/[0-9a-f-]{36}/);
});
