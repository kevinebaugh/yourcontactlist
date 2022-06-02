class Address < ApplicationRecord
  belongs_to :household
  has_many :people, through: :households

  def to_envelope
    "#{line1}\n#{line2.present? ? line2 + "\n" : nil}#{city}\n#{state}\n#{postal_code}\n#{country}"
  end
end
