class SessionSerializer < ActiveModel::Serializer
  belongs_to :person

  attributes :begin_date, :end_date
end
