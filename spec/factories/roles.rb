FactoryBot.define do
  factory :role do
    name { Faker::Job.unique.position }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
  end
end
