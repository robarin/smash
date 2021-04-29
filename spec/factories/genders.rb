FactoryBot.define do
  factory :gender do
    name { %w[Male Female Other].sample }

    trait :male do
      name { 'Male' }
    end

    trait :female do
      name { 'Female' }
    end

    trait :other do
      name { 'Other' }
    end
  end
end
