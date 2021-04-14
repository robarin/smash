module Smash
  module V1
    class Base < Grape::API
      helpers Smash::V1::ApiHelper

      before do
        authenticate_user! unless request.path.include?('users')
      end

      mount Smash::V1::Mobile::Base => :client
      mount Smash::V1::Users
      mount Smash::V1::Profiles
      mount Smash::V1::Roles
      mount Smash::V1::Countries

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
