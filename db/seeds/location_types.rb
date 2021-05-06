[
  'Online',
  'On-site',
  'Company',
  'University',
  'Smash',
  'Group call'
].each do |name|
  FactoryBot.create(:location_type, name: name)
end
