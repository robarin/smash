FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "#{n}#{Faker::Internet.unique.email}" }
    password { '123456' }
    confirmed_at { Time.zone.now }

    trait :unconfirmed do
      confirmed_at { nil }
    end

    trait :with_person do
      after :create do |user|
        create :person, user: user
      end
    end
  end
end
