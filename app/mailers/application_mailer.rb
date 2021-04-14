class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch('EMAIL_ADDRESS')
  layout 'mailer'
end
