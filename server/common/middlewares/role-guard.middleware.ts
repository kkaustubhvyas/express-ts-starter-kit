import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utilities/exceptions/http-exceptipn';
import { HttpStatus } from '../utilities/http-service';
import * as _ from 'lodash';
import { ForbiddenException } from '../utilities/exceptions/forbidden.exceptin';
import { RESOURCES, ROLES, AuthorizationMap } from '../utilities/constants';

function useRoleGuard(resources: RESOURCES[], roles: ROLES[]) {
  return function (request: Request, response: Response, next: NextFunction) {
    if (!resources || resources.length === 0 || resources.includes(RESOURCES.ALL)) {
      return next()
    }
    const context = request.context;
    if (!context) {
      throw new HttpException({
        message: 'User context not found',
        status: HttpStatus.INTERNAL_SERVER_ERROR
      })
    }
    const { userRoles = [] } = context
    const userResources = (userRoles || []).map(res => res.resource)
    const commonResources = _.intersection(userResources, resources)
    if (commonResources.length === 0) {
      throw new ForbiddenException()
    } else {
      let i = 0;
      let isAuthorized = false
      while (i < commonResources.length) {
        const groupedRole = _.find(userRoles, { resource: commonResources[i] })
        isAuthorized = validateRoles(groupedRole, roles)
        if (!isAuthorized) {
          throw new ForbiddenException()
        } else {
          i++;
        }
      }
      if (!isAuthorized) {
        throw new ForbiddenException()
      } else {
        next()
      }
    }
  }
}

function validateRoles(group, allowedRoles?: ROLES[]): boolean {
  const groupName = group.resource;
  const roles = group.userRoles
  const authRule = allowedRoles || AuthorizationMap[groupName]
  if (!authRule) {
    return false
  }
  if (allowedRoles.includes(ROLES.ALL)) {
    return true
  }
  const commonRoles = _.intersection(authRule, roles)
  if (commonRoles.length === 0) {
    return false
  } else {
    return true
  }
}


export { useRoleGuard };