FactoryBot.define do
  factory :question_response do
    name        { Faker::Lorem.word }
    description { Faker::Lorem.sentence }

    survey_question
  end
end
