class SessionsController < ApplicationController
  def create
    person = Person.find_by(email_address: params[:email_address])

    if person&.authenticate(params[:password])
      session[:person_id] = person.id

      render json: person
    else
      render json: { errors: ["🔒"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete :person_id
    head :no_content
  end
end
