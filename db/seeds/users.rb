require 'faker'

genders = Gender.all

(0..50).to_a.each do |n|
  user = User.find_by(email: "user#{n}@example.com")

  unless user
    user = User.new(
      email: "user#{n}@example.com",
      password: '123456',
      password_confirmation: '123456'
    )

    user.build_person(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      middle_name: Faker::Name.middle_name,
      gender: genders.sample,
      role: 'student'
    )

    user.save!
    user.confirm

    user.person.groups << Group.all.sample
  end
end
