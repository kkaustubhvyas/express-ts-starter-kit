import { NextFunction, Request, Response } from 'express';

export const createQueryString = (searchObj: { [key: string]: string } = {}) => {
  let result = '?';

  Object.keys(searchObj).forEach(key => {
    if (searchObj[key]) {
      result += `${key}=${searchObj[key]}&`;
    }
  });
  return result.slice(0, -1);
};

/**
 * For Quick Router Test
 * @param identifier
 * @returns
 */
export const dummyController = (identifier: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.log(`Reached to ${identifier}`);
    next();
  };
};
