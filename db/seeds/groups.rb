[
  'Programming',
  'Data science',
  'Design'
].each do |group_name|
  FactoryBot.create(:group, name: group_name)
end
