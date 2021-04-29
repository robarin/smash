FactoryBot.define do
  factory :survey_question do
    body          { Faker::Lorem.sentence }
    response_type { SurveyQuestion.response_types.values.sample }
    position      { Faker::Number.unique.number(digits: 2) }

    survey

    trait :with_responses do
      after :create do |survey_question|
        create_list(:question_response, 3, survey_question: survey_question)
      end
    end
  end
end
