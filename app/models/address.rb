class Address < ApplicationRecord
  belongs_to :household
  has_many :people, through: :households

  def to_envelope
    "#{line1}\n#{line2.present? ? line2 + "\n" : nil}#{city}\n#{state}\n#{postal_code}\n#{country}"
  end

  def staleness
    seconds = Time.now - updated_at

    OpenStruct.new({
      seconds: (seconds).round,
      minutes: (seconds / 60).round,
      hours:   (seconds / 60 / 60).round,
      days:    (seconds / 60 / 60 / 24).round,
      weeks:   (seconds / 60 / 60 / 24 / 7).round,
      months:  (seconds / 60 / 60 / 24 / 7 / 12).round,
      years:   (seconds / 60 / 60 / 24 / 365).round
    })
  end
end
