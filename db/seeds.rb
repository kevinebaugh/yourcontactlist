puts "🌱 Starting to seed"

LAST_NAMES_TO_CREATE = 15

last_names = []

LAST_NAMES_TO_CREATE.times do
  last_names.push(Faker::Name.unique.last_name)
end

last_names.each_with_index.map do |last_name, index|
  household = Household.new(
    name: last_name,
    address_id: index + 1
  )

  household.save(validate: false)

  puts "🏡 Created the #{household.name} household"
end

last_names.each_with_index.map do |last_name, index|
  address = Address.new(
    line1: Faker::Address.street_address,
    line2: Faker::Address.secondary_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    postal_code: Faker::Address.zip_code,
    country: Faker::Address.country,
    household_id: index + 1
  )

  address.save(validate: false)

  puts "📪 The #{address.household.name} household has Address.id #{address.id}"
end

last_names.each_with_index.map do |last_name, index|
  (rand(6) + 1).times do
    first_name = Faker::Name.first_name
    name = first_name + " #{last_name}"

    person = Person.create!(
      name: name,
      email_address: name.parameterize(separator: "_"),
      household_id: index + 1,
      password_digest: BCrypt::Password.create("dodgeviper")
    )

    puts "🙋 Added #{first_name} to the #{last_name} household"
  end
end
