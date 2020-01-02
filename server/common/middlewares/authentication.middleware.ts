import { Response, NextFunction, Request } from 'express';
import { UnAuthorizedException } from '../utilities/exceptions/unauthorized.exception';
import { AuthService } from '../central-services/auth/auth.service';
import { ProxyRules } from '../proxy/proxy.rules';

export const authenticate = () =>
  async (request: Request, response: Response, next: NextFunction) => {

    if (isOpenPath(request.path)) {
      return next()
    } else {
      const proxyRule = ProxyRules.find((proxy) => {
        if (typeof proxy.path === 'string') {
          return request.path.includes(proxy.path)
        } else if (proxy.path instanceof RegExp) {
          return proxy.path.test(request.path)
        } else {
          return false
        }
      })
      if (!proxyRule) {
        validateApi(request, response, next)
      } else if (proxyRule.secure) {
        validateProxy(request, response, next)
      } else {
        next()
      }
    }
  }

const isOpenPath = (path: string) => {
  path = path.replace(/\/$/, "");
  if (path === '/' || path === '') {
    return true
  } else if (path.includes('/api-explorer')) {
    return true
  } else if (path.includes('/specs')) {
    return true
  } else if (path.includes('/login')) {
    return true
  } else if (path.includes('/upload')) {
    return true
  } else {
    return false
  }
}

const validateApi = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.headers.auth_token) {
    return next(new UnAuthorizedException());
  } else {
    try {
      const result = await new AuthService(request).authenticate();
      request.context = result;
      request.headers.auth_token = result.auth_token;
      return next()
    } catch (e) {
      next(e)
    }
  }
}

const validateProxy = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.cookies.auth_token) {
    return response.redirect('/')
  } else {
    try {
      const result = await new AuthService(request).authenticate(request.cookies.auth_token);
      request.context = result;
      return next()
    } catch (e) {
      return response.redirect('/')
    }
  }
}
