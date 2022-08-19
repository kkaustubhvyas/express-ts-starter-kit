import { Response, NextFunction, Request } from 'express';
import { UnAuthorizedException } from '../utilities/exceptions/unauthorized.exception';
import { AuthService } from '../auth/auth.service';

const validateApi = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.headers.auth_token) {
    next(new UnAuthorizedException());
  } else {
    try {
      const result = await new AuthService(request).authenticate();
      request.user = result;
      request.headers.auth_token = result.auth_token;
      next();
    } catch (e) {
      next(e);
    }
  }
};

const isOpenPath = (path: string) => {
  // eslint-disable-next-line no-param-reassign
  path = path.replace(/\/$/, '');
  if (path === '/' || path === '') {
    return true;
  } else if (path.includes('/api-docs')) {
    return true;
  } else if (path.includes('/specs')) {
    return true;
  } else if (path.includes('/login')) {
    return true;
  } else {
    return false;
  }
};

export const authenticate = () => async (request: Request, response: Response, next: NextFunction) => {
  if (isOpenPath(request.path)) {
    return next();
  }
  validateApi(request, response, next);

  return next();
};
