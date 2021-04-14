require 'faker'

genders = Gender.all
provinces = Province.all

(0..10).to_a.each do |n|
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
      gender: genders.sample
    )

    user.save!
    user.confirm
  end
end
