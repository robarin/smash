5.times do
  person_event = FactoryBot.create(:person_event)
  achievements = FactoryBot.create_list(:achievement, 2)

  person_event.achievements << achievements
end

5.times do
  achievement = FactoryBot.create(:achievement)
  person_events = FactoryBot.create_list(:person_event, 2)

  achievement.person_events << person_events
end
