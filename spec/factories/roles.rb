FactoryBot.define do
  factory :role do
    sequence(:name) { |n| "#{n}#{Faker::Lorem.unique.word}" }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
  end
end
