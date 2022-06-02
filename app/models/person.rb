class Person < ApplicationRecord
  has_secure_password

  belongs_to :household, counter_cache: true
  has_one :address, through: :household

  validates :email_address, presence: true, uniqueness: true
end
