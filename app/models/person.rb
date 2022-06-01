class Person < ApplicationRecord
  belongs_to :household
  has_one :address, through: :household
end
