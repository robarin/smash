countries = [
  {
    name: 'USA',
    abbrev: 'US'
  }
]

countries.each do |h|
  Country.find_or_create_by!(name: h[:name], abbrev: h[:abbrev])
end
