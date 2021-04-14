class People::Profile::Setup < ApplicationInteractor
  uses_via_context :person, :params

  def call
    person.update!(
      phone: params[:phone],
      gender: gender,
      province: province
    )
  end

  private

  def gender
    @gender ||= Gender.find_by(name: params[:gender])
  end

  def province
    @province ||= Province.find_by(name: params[:province])
  end
end
