import passport from 'passport';
import express from 'express';
import { JsonResult } from '../@typings/JsonResult';
import { Roles } from '../@typings/enums/Roles';
import { User } from '../models/User.model';
import { Role } from '../models/Role.model';
// const passport = require('passport');

export const authNeedsManager = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const checkRole = new AuthorizationWithRole();
    const isMemberOf = checkRole.memberOfRole(req.roles, Roles.MANAGER);

    if (!isMemberOf) {
        return res.status(401).json(
            new JsonResult({
                success: false,
                data: {
                    code: 'ERR-008',
                    message: 'Access denied.',
                },
                message: 'Access denied.',
            }),
        );
    }

    return next();
};

export const authNeedsSystem = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const checkRole = new AuthorizationWithRole();
    const isMemberOf = checkRole.memberOfRole(req.roles, Roles.SYSTEM);

    if (!isMemberOf) {
        return res.status(401).json(
            new JsonResult({
                success: false,
                data: {
                    code: 'ERR-008',
                    message: 'Access denied.',
                },
                message: 'Access denied.',
            }),
        );
    }

    return next();
};

export class AuthorizationWithRole {
    public memberOfRole(roles: Role[], requireRole: Roles): boolean {
        const hasRole = roles.find((role) => role.name === requireRole);

        return !!hasRole;
    }
}
