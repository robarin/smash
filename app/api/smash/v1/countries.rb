module Smash
  module V1
    class Countries < Grape::API
      resource :countries do
        get do
          countries = Country.includes(regions: [:provinces])

          ActiveModelSerializers::SerializableResource
            .new(countries)
            .serializable_hash(include: { regions: [:provinces]})
        end
      end
    end
  end
end
