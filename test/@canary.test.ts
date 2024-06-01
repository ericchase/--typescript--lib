import { describe, expect, test } from 'bun:test';

describe('Canary', () => {
  test('true is truthy', () => {
    expect(true).toBeTruthy;
  });
  test('false is falsey', () => {
    expect(false).toBeFalsy;
  });
});
