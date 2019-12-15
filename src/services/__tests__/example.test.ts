import { myService } from '../example';

it('returns', () => {
  const result = myService(5);

  expect(result).toBe(25);
});
