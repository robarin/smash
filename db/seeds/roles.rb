roles = %w[Student]
roles.each do |role_name|
  Role.find_or_create_by!(name: role_name)
end
