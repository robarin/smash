country_regions = [
  {
    country_name: 'USA',
    regions: %w[Northeast Midwest South West]
  }
]

country_regions.each do |h|
  country = Country.find_by(name: h[:country_name])
  next unless country

  h[:regions].each do |region|
    Region.find_or_create_by!(name: region, country: country)
  end
end
