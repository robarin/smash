module Smash
  module V1
    module Admin
      class Events < Grape::API
        helpers do
          def event
            @event ||= ::Event.find(params[:id])
          end

          def create_event
            @result ||= ::Events::New::Organize.call(params: params)
          end

          def update_event
            @result ||= ::Events::Update::Organize.call(event: event, params: params)
          end
        end

        resource :events do
          desc 'GET /events'
          get '/', each_serializer: EventSerializer do
            collection = ::Event.includes(
              :event_type,
              :groups,
              location: [:location_type, province: [:region]]
            ).order(date: :desc)
            ActiveModelSerializers::SerializableResource.new(
              collection, include: [
              :event_type,
              :groups,
              location: [:location_type, province: :region]
            ]
            ).serializable_hash
          end

          desc 'GET /events/:id'
          get '/:id' do
            EventSerializer.new(event).serializable_hash(
              include: [
                :event_type,
                :groups,
                location: [:location_type, province: :region]
              ]
            )
          end

          desc 'POST /events'
          params do
            requires :event_type_id, type: Integer
            requires :name, type: String
            requires :description, type: String
            requires :date, type: DateTime
            requires :location, type: Hash do
              requires :location_type_id, type: Integer
              requires :province_id, type: Integer
              requires :city, type: String
              optional :street_number, type: String
              optional :zip, type: String
              optional :name, type: String
            end
            requires :group_ids, type: Array
          end
          post '/' do
            if create_event.failure?
              error!({ message: create_event.message }, 400)
            else
              EventSerializer.new(
                create_event.event,
                include: [
                  :groups,
                  location: :location_type
                ]
              ).serializable_hash
            end
          end

          desc 'PATCH /events/:id'
          params do
            requires :event_type_id, type: Integer
            requires :name, type: String
            requires :description, type: String
            requires :date, type: DateTime
            requires :location, type: Hash do
              requires :location_type_id, type: Integer
              requires :province_id, type: Integer
              requires :city, type: String
              optional :street_number, type: String
              optional :zip, type: String
              optional :name, type: String
            end
            requires :group_ids, type: Array
          end
          patch '/:id' do
            if update_event.failure?
              error!({ message: update_event.message }, 400)
            else
              EventSerializer.new(event).serializable_hash(
                include: [
                  :event_type,
                  :groups,
                  location: [:location_type, province: :region]
                ]
              )
            end
          end

          desc 'DELETE /events'
          delete '/:id' do
            event.destroy
            error!({ message: error_message(event) }, 400) unless event.destroyed?

            status :ok
          end
        end
      end
    end
  end
end
