import express from 'express';
import { JsonResult } from '../lib/JsonResult';
import { RoleNames } from '../lib/enums/Roles';
import { AuthorizationWithRole } from './AuthorizationWithRole';

export const authNeedsManager = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const checkRole = new AuthorizationWithRole();
  const isMemberOf = checkRole.memberOfRole(req.user && req.user.roles || [], RoleNames.MANAGER);

  if (!isMemberOf) {
    return res.status(401).json(
      new JsonResult({
        success: false,
        data: {
          code: 'ERR-008',
          message: 'Access denied.'
        },
        message: 'Access denied.'
      })
    );
  }

  return next();
};

export const authNeedsSystem = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const checkRole = new AuthorizationWithRole();
  const isMemberOf = checkRole.memberOfRole(req.user && req.user.roles || [], RoleNames.SYSTEM);

  if (!isMemberOf) {
    return res.status(401).json(
      new JsonResult({
        success: false,
        data: {
          code: 'ERR-008',
          message: 'Access denied.'
        },
        message: 'Access denied.'
      })
    );
  }

  return next();
};
