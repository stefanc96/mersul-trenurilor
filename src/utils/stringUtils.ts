import {deburr} from 'lodash';

export const clearString = (stringValue: string) => {
  return deburr(stringValue).toLowerCase();
};
