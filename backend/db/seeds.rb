admin = Admin.find_by(email: 'admin@example.com')
user = User.find_by(email: 'user@example.com')

unless user
  user = User.create!(
    first_name: 'user',
    last_name: 'one',
    email: 'user@example.com',
    password: '123456',
    password_confirmation: '123456'
  )

  user.confirm
end

unless admin
  Admin.create!(
    email: 'admin@example.com',
    password: '123456',
    password_confirmation: '123456',
  )
end
