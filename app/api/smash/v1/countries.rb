module Smash
  module V1
    class Countries < Grape::API
      resource :countries do
        get do
          countries = Country.includes(regions: [:provinces])

          CountrySerializer.new(countries).serializable_hash
        end
      end
    end
  end
end
