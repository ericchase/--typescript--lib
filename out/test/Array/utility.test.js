import { describe, expect, test } from 'bun:test';
import { generateChunks } from '../../src/Array/utility.js';
describe('generateChunkSlices', () => {});
describe('generateChunks', () => {
  test('size<1 returns []', () => {
    expect([...generateChunks([], 0)]).toStrictEqual([[]]);
    expect([...generateChunks([1], 0)]).toStrictEqual([[]]);
    expect([...generateChunks([1, 2], 0)]).toStrictEqual([[]]);
    expect([...generateChunks([1, 2, 3], 0)]).toStrictEqual([[]]);
    expect([...generateChunks([1, 2, 3, 4], 0)]).toStrictEqual([[]]);
  });
  test('size==length returns copy of array', () => {
    expect([...generateChunks([], 0)]).toStrictEqual([[]]);
    expect([...generateChunks([1], 1)]).toStrictEqual([[1]]);
    expect([...generateChunks([1, 2], 2)]).toStrictEqual([[1, 2]]);
    expect([...generateChunks([1, 2, 3], 3)]).toStrictEqual([[1, 2, 3]]);
    expect([...generateChunks([1, 2, 3, 4], 4)]).toStrictEqual([[1, 2, 3, 4]]);
  });
  test('size evenly divides length, returns full chunks', () => {
    expect([...generateChunks([1, 2, 3, 4], 1)]).toStrictEqual([[1], [2], [3], [4]]);
    expect([...generateChunks([1, 2, 3, 4], 2)]).toStrictEqual([
      [1, 2],
      [3, 4],
    ]);
    expect([...generateChunks([1, 2, 3, 4, 5, 6], 2)]).toStrictEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    expect([...generateChunks([1, 2, 3, 4, 5, 6], 3)]).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });
  test('size does not evenly divide length, returns partial chunk', () => {
    expect([...generateChunks([1], 2)]).toStrictEqual([[1]]);
    expect([...generateChunks([1, 2, 3], 2)]).toStrictEqual([[1, 2], [3]]);
    expect([...generateChunks([1, 2, 3, 4, 5], 2)]).toStrictEqual([[1, 2], [3, 4], [5]]);
    expect([...generateChunks([1], 3)]).toStrictEqual([[1]]);
    expect([...generateChunks([1, 2], 3)]).toStrictEqual([[1, 2]]);
    expect([...generateChunks([1, 2, 3, 4], 3)]).toStrictEqual([[1, 2, 3], [4]]);
  });
  test('size>length returns []', () => {
    expect([...generateChunks([], 1)]).toStrictEqual([[]]);
    expect([...generateChunks([1], 2)]).toStrictEqual([[1]]);
    expect([...generateChunks([1, 2], 3)]).toStrictEqual([[1, 2]]);
    expect([...generateChunks([1, 2, 3], 4)]).toStrictEqual([[1, 2, 3]]);
    expect([...generateChunks([1, 2, 3, 4], 5)]).toStrictEqual([[1, 2, 3, 4]]);
  });
});
