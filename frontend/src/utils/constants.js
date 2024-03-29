export const API_ROUTES = {
  me: '/v1/me',
  login: '/v1/users/login',
  signup: '/v1/users/sign_up',
  logout: '/v1/users/logout',
  oauth: {
    signup: '/v1/users/oauth/sign_up',
  },
  admin: {
    users: '/v1/admin/users',
    tags: '/v1/admin/tags',
    surveyTypes: '/v1/admin/survey_types',
    surveys: '/v1/admin/surveys',
    questions: '/v1/admin/questions',
    surveyQuestions: '/v1/admin/survey_questions',
    events: '/v1/admin/events',
    eventRelatedEntities: '/v1/admin/event_related_entities',
  },
  profile: {
    update: '/v1/profile/',
    avatar: '/v1/profile/avatar',
    setup: '/v1/profile/setup'
  },
  roles: {
    index: '/v1/roles',
  },
  countries: {
    index: '/v1/countries'
  },
  surveys: {
    index: '/v1/surveys',
    basic: '/v1/surveys/basic',
    results: '/v1/surveys/results'
  }
}
