class LocationSerializer < ActiveModel::Serializer
  attributes :city,
             :street_number,
             :zip,
             :name,
             :description,
             :province_id,
             :region_id

  belongs_to :location_type, serializer: LocationTypeSerializer
  belongs_to :province, serializer: ProvinceSerializer

  def region_id
    object.province.region_id
  end
end
