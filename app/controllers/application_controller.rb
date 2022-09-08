class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate
    if session.include?(:person_id)
      true
    else
      render json: { error: "🔒 Not authorized" }, status: :unauthorized
    end
  end
end
