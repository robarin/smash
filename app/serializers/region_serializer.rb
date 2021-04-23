class RegionSerializer < ActiveModel::Serializer
  attributes :name, :description, :provinces

  belongs_to :country

  def provinces
    object.provinces.map do |p|
      ProvinceSerializer.new(p).serializable_hash
    end
  end
end
