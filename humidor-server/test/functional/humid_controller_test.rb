require 'test_helper'

class HumidControllerTest < ActionController::TestCase
  test "should get getSaved" do
    get :getSaved
    assert_response :success
  end

  test "should get getCurrent" do
    get :getCurrent
    assert_response :success
  end

end
