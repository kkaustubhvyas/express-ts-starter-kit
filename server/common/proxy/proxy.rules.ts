import { BASEURL } from "../environments/configs/baseurl.environment";
import { RESOURCES, ROLES } from "../utilities/constants";

export interface ProxyRule {
  path: string | RegExp;
  target: string;
  origin: string;
  allowedResource?: RESOURCES[];
  allowedRoles?: ROLES[];
  onProxyRes?: (...args: any[]) => void;
  headers?: any;
  changeOrigin?: boolean;
  pathRewrite?: any;
  secure?: boolean;
}

export const ProxyRules: ProxyRule[] = [
  
];
