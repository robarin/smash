FactoryBot.define do
  factory :gender do
    sequence(:name) { |n| "#{n}#{Faker::Lorem.unique.word}" }

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
