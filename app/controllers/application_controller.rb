class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection

  protect_from_forgery prepend: true

  def frontend
    render file: "public/index.html", layout: false
  end
end
