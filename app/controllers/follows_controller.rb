class FollowsController < ApplicationController
  def update
    # Find Household based on user currently signed in
    household = Person.find_by(id: session[:person_id]).household

    # Use to cheat when sending the request:
    # household = Household.find_by(id: params[:household_id])

    household_ids_to_follow = params[:household_ids_to_follow]

    unless household_ids_to_follow.is_a?(Array)
      household_ids_to_follow = household_ids_to_follow.split.map(&:to_i)
    end

    household_ids_to_follow.each do |household_id_to_follow|
      household_to_follow = Household.find_by(id: household_id_to_follow)

      if household.followings.include?(household_to_follow)
        puts "Skipping, the #{household.name} household already follows the #{household_to_follow.name} household."
      else
        Follow.create!(household_id: household.id, followed_household_id: household_to_follow.id)
      end
    end

    render json: household.followings, status: :ok
  end
end
