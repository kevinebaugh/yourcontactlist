class Follow < ApplicationRecord
  # The household giving the follow
  belongs_to :follower, foreign_key: :household_id, class_name: "Household"

  # The household being followed
  belongs_to :followed_household, foreign_key: :followed_household_id, class_name: "Household"
end
