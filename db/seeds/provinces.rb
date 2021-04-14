region_provinces = [
  {
    country: 'USA',
    regions: [
      {
        name: 'Northeast',
        provinces: %w[Massachusetts Vermont Connecticut Maine]
      },
      {
        name: 'Midwest',
        provinces: %w[Illinois Indiana Michigan Ohio Wisconsin]
      },
      {
        name: 'South',
        provinces: %w[Delaware Florida Georgia Maryland Virginia]
      },
      {
        name: 'West',
        provinces: %w[Washington Arizona Colorado Idaho Nevada Montana]
      }
    ]
  }
]

region_provinces.each do |h|
  country = Country.find_by(name: h[:country])
  next unless country

  h[:regions].each do |r_hash|
    region = Region.find_by(name: r_hash[:name], country: country)
    next unless region

    r_hash[:provinces].each do |province_name|
      Province.find_or_create_by!(name: province_name, region: region)
    end
  end
end
