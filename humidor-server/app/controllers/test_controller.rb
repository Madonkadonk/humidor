class TestController < ApplicationController
  def mail
    HelloMailer.hello_mail().deliver
  end
end
