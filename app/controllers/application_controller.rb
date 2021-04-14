class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection

  protect_from_forgery prepend: true

  def frontend
    if FileTest.exists? Rails.root.join('public', 'index.html')
      render file: "public/index.html", layout: false
    else
      raise "'public/index.html' doesn't exists. Please check frontend application is builded and located in 'public' directory or use frontend app runned by dev server"
    end
  end
end
