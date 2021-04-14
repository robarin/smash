admin = Admin.find_by(email: 'admin@example.com')

unless admin
  Admin.create!(
    email: 'admin@example.com',
    password: '123456',
    password_confirmation: '123456',
  )
end
