class RegionSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :provinces

  belongs_to :country

  has_many :provinces, each_serializer: ProvinceSerializer
end
