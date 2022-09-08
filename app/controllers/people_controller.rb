class PeopleController < ApplicationController
  before_action :authenticate, except: :create

  def create
    unless params[:password] == params[:password_confirmation]
      return render json: {errors: ["passwords must match"]}, status: :unprocessable_entity
    end

    household_id = if params[:household_id].present?
      params[:household_id]
    else
      name_array = params[:name].split(" ")
      last_name = if name_array.length > 1
        name_array.last.titlecase
      else
        nil
      end

      Household.generate_fake(last_name: last_name).id
    end

    person = Person.create!(
      email_address: params[:email_address],
      name: params[:name],
      household_id: household_id,
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )

    session[:person_id] = person.id

    render json: person, include: [:household, :address, :followings], status: :created
  rescue => e
    render json: {error: e}, status: :unprocessable_entity
  end

  def show
    person = Person.find_by(id: session[:person_id])

    render json: person, include: [:household, :address, :followings, :addresses], status: :ok
  end
end
