class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|
      t.string  :line1
      t.string  :line2
      t.string  :city
      t.string  :state
      t.string  :postal_code
      t.string  :country
      t.integer :household_id
      t.integer :people_count

      t.timestamps
    end
  end
end
