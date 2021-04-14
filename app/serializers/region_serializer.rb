class RegionSerializer
  include JSONAPI::Serializer

  attributes :name, :description

  attribute :provinces do |object|
    ProvinceSerializer.new(object.provinces).serializable_hash[:data]
  end
end
