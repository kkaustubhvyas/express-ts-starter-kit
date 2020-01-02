import { Application } from 'express';
import { ProxyRules, ProxyRule } from './proxy.rules';
import { useRoleGuard } from '../middlewares/role-guard.middleware';

const proxyMiddleware = require('http-proxy-middleware');

export function proxy(app: Application) {
  ProxyRules.forEach((rule: ProxyRule) => {
    app.use(
      rule.path,
      useRoleGuard(rule.allowedResource, rule.allowedRoles),
      proxyMiddleware({
        ...rule,
        changeOrigin: false,
        logLevel: 'debug',
        onError(err, req, res) {
          res.status(500).send(err.message);
        },
      }));
  });
}
