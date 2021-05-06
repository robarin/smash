[
  'Interview',
  'Hackathon',
  'Seminar',
  'Course',
  'Company challenge',
  'Mentor talks',
  'Skill evaluation'
].each do |name|
  FactoryBot.create(:event_type, name: name)
end
