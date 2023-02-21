import queryString from 'query-string';
import { omit } from 'lodash';

export const queryStringToObject = (str: string, options = {}) =>
    queryString.parse(str, {
        arrayFormat: 'bracket',
        ...options,
    });

export const objectToQueryString = (obj: { [key: string]: string }, options = {}) =>
    queryString.stringify(obj, {
        arrayFormat: 'bracket',
        ...options,
    });

export const omitFromQueryString = (str: string, keys: any) =>
    objectToQueryString(omit(queryStringToObject(str), keys));

export const addToQueryString = (str: string, fields: any) =>
    objectToQueryString({
        ...queryStringToObject(str),
        ...fields,
    });