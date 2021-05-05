admin = Admin.find_by(email: 'admin@example.com')

unless admin
  FactoryBot.create(:admin)
end
