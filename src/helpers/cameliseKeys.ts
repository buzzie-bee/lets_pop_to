import { camelCase } from 'lodash';

export const cameliseKeys = (
  obj: { [x: string]: any; map?: any; constructor?: any } | null
): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => cameliseKeys(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: cameliseKeys(obj[key]),
      }),
      {}
    );
  }
  return obj;
};
