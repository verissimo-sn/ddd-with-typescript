import { test } from './index';

describe('Main test', () => {
  it('should run initial test', () => {
    const message = 'initial config';
    const response = test(message);

    expect(response).toStrictEqual(message);
  });
});
