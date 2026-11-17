import { getTag, isPlainObject, merge } from './utils';

describe('getTag()', () => {
  test('should return [object Undefined] for undefined type', () => {
    const tag = getTag(undefined);

    expect(tag).toBe('[object Undefined]');
  });

  test('should return [object Null] for null type', () => {
    const tag = getTag(null);

    expect(tag).toBe('[object Null]');
  });
});

describe('isPlainObject()', () => {
  test('should return true if object has no prototype', () => {
    const result = isPlainObject(Object.create(null));

    expect(result).toBe(true);
  });
});

describe('merge()', () => {
  afterEach(() => {
    delete (Object.prototype as any).polluted;
  });

  test('should not pollute Object.prototype through an own __proto__ key', () => {
    const target = { name: 'a', nested: { x: 1 } };
    merge(target, JSON.parse('{"name":"b","__proto__":{"polluted":true},"nested":{"__proto__":{"polluted":true}}}'));

    expect(({} as any).polluted).toBeUndefined();
    expect(Object.getPrototypeOf(target)).toBe(Object.prototype);
    expect(Object.getPrototypeOf(target.nested)).toBe(Object.prototype);
    expect(target).toEqual({ name: 'b', nested: { x: 1 } });
  });

  test('should not replace the target prototype with an own non-object __proto__ value', () => {
    const target = { name: 'a' };
    merge(target, JSON.parse('{"__proto__":null}'));

    expect(Object.getPrototypeOf(target)).toBe(Object.prototype);
  });
});
