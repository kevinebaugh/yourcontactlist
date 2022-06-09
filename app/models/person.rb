class Person < ApplicationRecord
  has_secure_password

  belongs_to :household, counter_cache: true
  has_one :address, through: :household
  has_many :followings, through: :household

  validates :name, presence: true
  validates :email_address, presence: true, uniqueness: { case_sensitive: false }
end
