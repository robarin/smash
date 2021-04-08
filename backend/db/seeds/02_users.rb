(0..10).to_a.each do |n|
  user = User.find_by(email: "user#{n}@example.com")

  unless user
    user = User.new(
      email: "user#{n}@example.com",
      password: '123456',
      password_confirmation: '123456'
    )

    user.build_person(
      first_name: 'user',
      last_name: "#{n}",
      middle_name: 'R.',
      gender: Gender.all.sample
    )

    user.save!
    user.confirm
  end
end

admin = Admin.find_by(email: 'admin@example.com')

unless admin
  Admin.create!(
    email: 'admin@example.com',
    password: '123456',
    password_confirmation: '123456',
    )
end
