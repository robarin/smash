['Basic', 'Regular activity', 'Weekly'].each do |name|
  SurveyType.find_or_create_by!(name: name, description: "#{name} survey type")
end
