FactoryBot.define do
  factory :survey do
    name        { Faker::Lorem.word }
    description { Faker::Lorem.paragraph(sentence_count: 2) }

    association :survey_type, :basic

    trait :with_questions do
      after :create do |survey|
        create_list(:survey_question, 2, :with_responses, survey: survey)
      end
    end
  end
end
