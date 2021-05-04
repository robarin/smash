event = FactoryBot.create(:event)
role = FactoryBot.create(:role)

5.times do
  person = FactoryBot.create(:person)

  # 5 people with same event and role
  FactoryBot.create(:person_event, person: person, event: event, role: role)

  # 5 people with same event and different roles
  FactoryBot.create(:person_event, person: person, event: event)

  # 5 people with same role and different events
  FactoryBot.create(:person_event, person: person, role: role)

  # 5 people with different events and roles
  FactoryBot.create(:person_event, person: person)
end
