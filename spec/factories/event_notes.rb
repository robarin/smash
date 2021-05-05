FactoryBot.define do
  factory :event_note do
    body { Faker::Lorem.paragraph }
    date { Time.zone.now }
    person_event
    rating
  end
end
