require 'faker'

unless SurveyType.any?
  ['Basic', 'Regular activity', 'Weekly'].each do |name|
    SurveyType.create!(name: name, description: Faker::Lorem.sentence)
  end
end
