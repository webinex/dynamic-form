export function except<T>(array: readonly T[], ...values: readonly T[]): T[] {
  return array.filter((item) => !values.includes(item));
}

export function swap<T>(array: T[], index1: number, index2: number): T[] {
  if (index1 < 0 || index2 < 0 || index1 >= array.length || index2 >= array.length) {
    throw new Error('Index out of bounds');
  }

  const newArray = [...array];
  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
  return newArray;
}

/**
 * Parses a string path (e.g., "a.b[3].c") into an array of keys.
 * Supports nested object properties and array indices.
 *
 * @param {string} path - The string path to parse, using dot and bracket notation.
 * @returns {(string | number)[]} An array of keys where strings represent property names and numbers represent array indices.
 *
 * @example
 * parsePath("a.b[3].c"); // ["a", "b", 3, "c"]
 * parsePath("user.addresses[0].street"); // ["user", "addresses", 0, "street"]
 */
export function parsePath(path: string): (string | number)[] {
  const parts: (string | number)[] = [];

  path.split('.').forEach((part) => {
    const regex = /([^[\]]+)|\[(\d+)\]/g;
    let match;

    while ((match = regex.exec(part)) !== null) {
      if (match[1] !== undefined) {
        parts.push(match[1]);
      } else if (match[2] !== undefined) {
        parts.push(Number(match[2]));
      }
    }
  });

  return parts;
}

/**
 * Converts a path represented as an array of strings and/or numbers into a dot-separated string.
 * If the path is empty, it returns null.
 * The resulting string will use dot notation for object properties and square brackets for array indices.
 *
 * @example
 * pathToName(['a', 'b', 3, 'c']) // "a.b[3].c"
 * pathToName(['user', 'addresses', 0, 'street']) // "user.addresses[0].street"
 * pathToName([]) // null
 *
 * @param path - An array of strings and/or numbers representing a path.
 * @returns
 */
export function pathToName(path: (string | number)[]): string | null {
  if (path.length === 0) {
    return null;
  }

  let result = '';
  for (const x of path) {
    if (typeof x === 'number') {
      result += `[${x}]`;
    } else {
      if (result.length > 0) {
        result += '.';
      }
      result += x;
    }
  }

  return result;
}

/**
 * Parses a field name to extract the index if it is in the format "field[index]".
 *
 * @param name - The name of the field, which may include an index in square brackets (e.g., "field[3]").
 * @returns
 */
export function parseIndex(name: string) {
  const match = name.match(/\[(\d+)\]$/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}
