/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function flattenArray(sourceArr: any[]): any[] {
  const flattenedArray: any[] = [];

  function flattenHelper(arr: any[]) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flattenHelper(arr[i]);
      } else {
        flattenedArray.push(arr[i]);
      }
    }
  }

  flattenHelper(sourceArr);
  return flattenedArray;
}
