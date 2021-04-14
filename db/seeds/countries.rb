countries = [
  {
    name: 'USA',
    abbrev: 'US'
  },
  {
    name: 'Canada',
    abbrev: 'CA'
  },
  {
    name: 'Mexico',
    abbrev: 'MX'
  }
]

countries.each do |h|
  Country.find_or_create_by!(name: h[:name], abbrev: h[:abbrev])
end
