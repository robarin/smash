%w[male female].each do |g|
  Gender.find_or_create_by!(name: g)
end
