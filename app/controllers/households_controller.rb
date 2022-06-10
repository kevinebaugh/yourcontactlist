class HouseholdsController < ApplicationController
  def index
    households = Household.all

    render json: households, include: [:address, :people], status: :ok
  end
end
