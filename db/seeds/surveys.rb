basic_survey_type = SurveyType.find_by!(name: 'Basic')
basic_survey = Survey.find_or_create_by!(
  {
    survey_type: basic_survey_type,
    name: Survey::BASIC_SURVEY_NAME,
    description: 'Basic survey description'
  }
)
