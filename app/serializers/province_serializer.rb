class ProvinceSerializer < ActiveModel::Serializer
  attributes :name, :description

  belongs_to :region, serializer: RegionSerializer
end
