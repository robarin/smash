FactoryBot.define do
  factory :event_note do
    person_event
    note_date { Time.zone.now }
    type { EventNote.types.values.sample }
    rating
    note_body { Faker::Lorem.paragraph }
  end
end
