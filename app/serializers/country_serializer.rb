class CountrySerializer < ActiveModel::Serializer
  attributes :name, :description

  has_many :regions, each_serializer: RegionSerializer
end
