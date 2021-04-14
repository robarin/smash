class CountrySerializer
  include JSONAPI::Serializer

  attributes :name, :description

  attribute :regions do |object|
    RegionSerializer.new(object.regions).serializable_hash[:data]
  end
end
