class ProvinceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description

  belongs_to :region, serializer: RegionSerializer
end
