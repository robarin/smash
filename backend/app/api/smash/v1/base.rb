module Smash
  module V1
    class Base < Grape::API
      mount Smash::V1::Mobile::Base => :client
      mount Smash::V1::Users

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
