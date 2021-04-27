FactoryBot.define do
  factory :survey_type do
    description { Faker::Lorem.paragraph(sentence_count: 2) }

    trait :basic do
      name { 'Basic' }
    end

    trait :weekly do
      name { 'Weekly' }
    end

    trait :regular do
      name { 'Regular activity' }
    end
  end
end
