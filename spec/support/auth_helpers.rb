include RackSessionAccess::Rspec

module AuthHelpers
  def as_user(user = nil, &block)
    current_user = user || FactoryBot.create(:user, :with_person)
    set_rack_session(access_token: current_user.access_token)

    yield if block.present?

    current_user
  end
end
