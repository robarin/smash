admin = Admin.find_by(email: 'admin@example.com')

(0..10).to_a.each do |n|
  user = User.find_by(email: "user#{n}@example.com")

  unless user
    user = User.create!(
      first_name: 'user',
      last_name: "#{n}",
      email: "user#{n}@example.com",
      password: '123456',
      password_confirmation: '123456'
    )

    user.confirm
  end
end

unless admin
  Admin.create!(
    email: 'admin@example.com',
    password: '123456',
    password_confirmation: '123456',
  )
end
