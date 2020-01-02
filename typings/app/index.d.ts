export namespace App {
  export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

  export type RoleGroup = {
    resource: string;
    userRoles: string[];
  }

  export type UserContext = {
    auth_token: string;
    userRoles: RoleGroup[]
  }

}