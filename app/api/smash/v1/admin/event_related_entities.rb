module Smash
  module V1
    module Admin
      class EventRelatedEntities < Grape::API
        helpers do
          def event_types
            collection = ::EventType.order(:name)
            ActiveModelSerializers::SerializableResource.new(collection).serializable_hash
          end

          def groups
            collection = ::Group.order(:name)
            ActiveModelSerializers::SerializableResource.new(collection).serializable_hash
          end

          def location_types
            collection = ::LocationType.order(:name)
            ActiveModelSerializers::SerializableResource.new(collection).serializable_hash
          end

          def regions
            collection = ::Region.includes(:provinces).order(:name)
            ActiveModelSerializers::SerializableResource.new(collection, include: :provinces).serializable_hash
          end
        end

        desc 'GET /event_related_entities'
        get '/event_related_entities' do
          {
            event_types: event_types,
            groups: groups,
            location_types: location_types,
            regions: regions
          }
        end
      end
    end
  end
end
