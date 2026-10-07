import { expectTypeOf } from 'vitest';
import type { PathValue } from '@/vee-validate';

interface Values {
  name: string;
  tags: string[];
  lines: { quantity: number; children: { label: string }[] }[];
  pair: [number, { flag: boolean }];
}

describe('PathValue', () => {
  test('resolves object paths', () => {
    expectTypeOf<PathValue<Values, 'name'>>().toEqualTypeOf<string>();
  });

  test('resolves bracket array paths produced by Path', () => {
    expectTypeOf<PathValue<Values, 'tags[0]'>>().toEqualTypeOf<string>();
    expectTypeOf<PathValue<Values, `tags[${number}]`>>().toEqualTypeOf<string>();
    expectTypeOf<PathValue<Values, `lines[${number}]`>>().toEqualTypeOf<Values['lines'][number]>();
    expectTypeOf<PathValue<Values, `lines[${number}].quantity`>>().toEqualTypeOf<number>();
    expectTypeOf<PathValue<Values, `lines[${number}].children[${number}].label`>>().toEqualTypeOf<string>();
  });

  test('resolves tuple paths', () => {
    expectTypeOf<PathValue<Values, 'pair[0]'>>().toEqualTypeOf<number>();
    expectTypeOf<PathValue<Values, 'pair[1].flag'>>().toEqualTypeOf<boolean>();
  });
});
