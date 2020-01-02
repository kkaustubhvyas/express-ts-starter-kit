export enum RESOURCES {
  ALL = 'all',
  EXAMPLES = 'examples'
}

export enum ROLES {
  ALL = 'all',
  ADMIN = 'admin',
  USER = 'user'
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export const AuthorizationMap: { [k: string]: ROLES[] } = {
  [RESOURCES.ALL]: [
    ROLES.ALL
  ],
  [RESOURCES.EXAMPLES]: [
    ROLES.ADMIN,
    ROLES.USER
  ]
}