import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { HttpException } from '../utilities/exceptions/http-exception';
import { HttpStatus } from '../utilities/http-service';
import { ForbiddenException } from '../utilities/exceptions/forbidden.exception';
import { RESOURCES, ROLES, AuthorizationMap } from '../utilities/constants';

function validateRoles(group: { resource: any; userRoles: any }, allowedRoles?: ROLES[]): boolean {
  const groupName = group.resource;
  const roles = group.userRoles;
  const authRule = allowedRoles || AuthorizationMap[groupName] || [ROLES.ALL];
  if (!authRule) {
    return false;
  }
  if (allowedRoles?.includes?.(ROLES.ALL)) {
    return true;
  }
  const commonRoles = _.intersection(authRule, roles);
  if (commonRoles.length === 0) {
    return false;
  } else {
    return true;
  }
}

function useRoleGuard(resources: RESOURCES[], roles: ROLES[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!resources || resources.length === 0 || resources.includes(RESOURCES.ALL)) {
      return next();
    }
    const { user } = request;
    if (!user) {
      throw new HttpException({
        message: 'User user not found',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    const { userRoles = [] } = user;
    const userResources = (userRoles || []).map((res: any) => res.resource);
    const commonResources = _.intersection(userResources, resources);
    if (commonResources.length === 0) {
      throw new ForbiddenException();
    } else {
      let i = 0;
      let isAuthorized = false;
      while (i < commonResources.length) {
        const groupedRole = _.find(userRoles, { resource: commonResources[i] });
        isAuthorized = validateRoles(groupedRole, roles);
        if (!isAuthorized) {
          throw new ForbiddenException();
        } else {
          i++;
        }
      }
      if (!isAuthorized) {
        throw new ForbiddenException();
      } else {
        return next();
      }
    }
  };
}

export { useRoleGuard };
