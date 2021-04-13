export const API_ROUTES = {
  login: '/v1/users/login',
  signup: '/v1/users/sign_up',
  logout: '/v1/users/logout',
  oauth: {
    signup: '/v1/users/oauth/sign_up',
  },
  admin: {
    users: '/v1/admin/users',
    tag_types: '/v1/admin/tag_types',
    surveyTypes: '/v1/admin/survey_types',
  },
  profile: {
    update: '/v1/profile/',
    avatar: '/v1/profile/avatar'
  }
}
