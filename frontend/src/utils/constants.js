export const API_ROUTES = {
  login: '/v1/users/login',
  signup: '/v1/users/sign_up',
  logout: '/v1/users/logout',
  admin: {
    users: '/v1/admin/users',
    tag_types: '/v1/admin/tag_types',
  },
  oauth: {
    signup: '/v1/users/oauth/sign_up',
  }
}
