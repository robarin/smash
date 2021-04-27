FactoryBot.define do
  factory :role do
    name { Faker::Job.position }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
  end
end
