require 'faker'

SurveyType.all.each do |survey_type|
  Survey.create!(
    name: "#{Faker::Lorem.word.capitalize} survey",
    description: Faker::Lorem.sentence,
    survey_type: survey_type
  )
end
