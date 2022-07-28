class HouseholdsController < ApplicationController
  def index
    households = Household.all

    render json: households, include: [:address, :people], status: :ok
  end

  def update_address
    address = Household.find(params[:household_id]).address
    address.line1 = params[:line1]
    address.line2 = params[:line2]
    address.city = params[:city]
    address.state = params[:state]
    address.postal_code = params[:postal_code]
    address.country = params[:country]
    address.save!

    render json: { errors: [] }
  rescue => error
    render json: { errors: [error.full_message] }
  end

  def delete_address
    address = Household.find(params[:household_id]).address
    address.destroy!
    render json: { errors: [] }
  rescue => error
    render json: { errors: [error.full_message] }
  end
end
