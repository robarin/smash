module Smash
  module V1
    module Admin
      class Base < Grape::API
        helpers Smash::V1::Admin::ApiHelper

        before do
          authenticate_admin!
        end

        mount Smash::V1::Admin::Users
        mount Smash::V1::Admin::TagTypes
        mount Smash::V1::Admin::Tags
        mount Smash::V1::Admin::SurveyTypes
        mount Smash::V1::Admin::Surveys
        mount Smash::V1::Admin::SurveyQuestions
        mount Smash::V1::Admin::Events
        mount Smash::V1::Admin::EventRelatedEntities

        add_swagger_documentation \
        doc_version: '1.0.0',
        host: 'www.robarin.pro',
        base_path: 'v1/',
        info: {
          title: 'Smash API',
          contact_name: 'Igor Kim',
          contact_email: 'igor.kim@robarin.pro',
          contact_url: 'http://www.robarin.pro'
        }
      end
    end
  end
end
