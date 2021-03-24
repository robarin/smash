module Transactable
  extend ActiveSupport::Concern

  included do
    around do |interactor|
      begin
        ActiveRecord::Base.transaction do
          interactor.call(context)
        rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotFound => e
          context.fail!(message: e.message)
        end
      end
    end
  end
end
