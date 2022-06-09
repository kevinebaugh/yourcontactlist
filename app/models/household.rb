class Household < ApplicationRecord
  has_many :people
  has_one :address

  # Returns an array of follows (not households) for the given household instance
  has_many :received_follows, foreign_key: :followed_household_id, class_name: "Follow"

  # Returns an array of households who follow the household instance
  has_many :followers, through: :received_follows, source: :follower

  # Returns an array of follows (not households) a household gave to other households
  has_many :given_follows, foreign_key: :household_id, class_name: "Follow"

  # Returns an array of other households who the household has followed
  has_many :followings, through: :given_follows, source: :followed_household
end
