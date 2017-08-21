// @flow

declare class String {
  [key: number]: string;
  length: number;
  @@iterator(): Iterator<string>;
  anchor(name: string): string;
  charAt(pos: number): string;
  charCodeAt(index: number): number;
  codePointAt(index: number): number;
  concat(...strings: Array<string>): string;
  constructor(value?: mixed): void;
  endsWith(searchString: string, position?: number): boolean;
  includes(searchString: string, position?: number): boolean;
  indexOf(searchString: string, position?: number): number;
  lastIndexOf(searchString: string, position?: number): number;
  link(href: string): string;
  localeCompare(that: string, locales?: string | Array<string>, options?: Object): number;
  match(regexp: string | RegExp): ?Array<string>;
  normalize(format?: string): string;
  padEnd(targetLength: number, padString?: string): string;
  padStart(targetLength: number, padString?: string): string;
  repeat(count: number): string;
  replace(searchValue: string | RegExp, replaceValue: string | (substring: string, ...args: Array<any>) => string): string;
  search(regexp: string | RegExp): number;
  slice(start?: number, end?: number): string;
  split(separator?: string | RegExp, limit?: number): Array<string>;
  startsWith(searchString: string, position?: number): boolean;
  substr(from: number, length?: number): string;
  substring(start: number, end?: number): string;
  toLocaleLowerCase(): string;
  toLocaleUpperCase(): string;
  toLowerCase(): string;
  toUpperCase(): string;
  trim(): string;
  trimLeft(): string;
  trimRight(): string;
  valueOf(): string;
  toString(): string;
  static (value:any):string;
  static fromCharCode(...codes: Array<number>): string;
  static fromCodePoint(...codes: Array<number>): string;
  static raw(templateString: string): string;
  static raw(callSite: $Shape<{raw: string}>, ...substitutions: any[]): string;
}
