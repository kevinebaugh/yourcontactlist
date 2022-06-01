class Address < ApplicationRecord
  belongs_to :household
  has_many :people, through: :households
end
