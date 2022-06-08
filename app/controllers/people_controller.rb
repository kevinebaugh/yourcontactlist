class PeopleController < ApplicationController
  def create
    unless params[:password] == params[:password_confirmation]
      return render json: {errors: ["passwords must match"]}, status: :unprocessable_entity
    end

    person = Person.create(
      email_address: params[:email_address],
      name: params[:name],
      household_id: params[:household_id],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    # session[:person_id] = person.id

    render json: person, status: :created
  end

  def show
    person = Person.find_by(id: session[:person_id])

    if person
      render json: person
    else
      render json: { errors: ["🔒"] }, status: :unauthorized
    end
  end
end
