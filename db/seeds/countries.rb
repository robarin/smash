countries = [
  {
    name: 'USA',
    abbrev: 'US'
  }
]

countries.each do |h|
  country = Country.find_by(name: h[:name], abbrev: h[:abbrev])

  unless country
    FactoryBot.create(:country, name: h[:name], abbrev: h[:abbrev])
  end
end
