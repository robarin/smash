require 'faker'

basic_survey = Survey.create!(
  {
    survey_type: SurveyType.find_or_create_by!(name: 'Basic'),
    name: 'Basic survey',
    description: Faker::Lorem.sentence
  }
)
basic_survey.survey_questions.create!(question: Question.find_by(name: 'Hearing about us'), position: 1)
basic_survey.survey_questions.create!(question: Question.find_by(name: 'Language knowledge'), position: 2)

onboarding_survey = Survey.create!(
  {
    survey_type: SurveyType.find_or_create_by!(name: 'Onboarding'),
    name: 'Onboarding survey for students',
    description: Faker::Lorem.sentence
  }
)
onboarding_survey.survey_questions.create!(question: Question.find_by(name: 'Leadership'), position: 1)
onboarding_survey.survey_questions.create!(question: Question.find_by(name: 'Priorities in tasks'), position: 2)

activity_survey = Survey.create!(
  {
    survey_type: SurveyType.find_or_create_by!(name: 'Regular activity'),
    name: 'Activities survey',
    description: Faker::Lorem.sentence
  }
)
