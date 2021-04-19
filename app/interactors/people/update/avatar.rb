class People::Update::Avatar < ApplicationInteractor
  uses_via_context :person, :file

  def call
    person.avatar = file
    person.save!

  rescue ActiveRecord::RecordInvalid => e
    context.fail!(message: e.message)
  end
end
