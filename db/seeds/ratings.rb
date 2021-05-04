(1..10).each do |n|
  FactoryBot.create(:rating, numeric: n)
end
