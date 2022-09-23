export const flatMap: any = (arr: any, fn: any) =>
  arr.reduce((xs: any, x: any) => xs.concat(fn(x)), []);
