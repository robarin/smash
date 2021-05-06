LocationType.all.each do |location_type|
  FactoryBot.create(:location, location_type: location_type, province: Province.all.sample)
end
