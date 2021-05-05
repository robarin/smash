Province.all.each do |province|
  FactoryBot.create(:location, province: province)
end
