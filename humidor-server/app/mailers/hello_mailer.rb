class HelloMailer < ActionMailer::Base
  default from: "madonkadonk@gmail.com"
  def hello_mail()
    mail(:to => 'matthew.k.madonna@gmail.com', :subject => 'Hello World!')
  end
end
