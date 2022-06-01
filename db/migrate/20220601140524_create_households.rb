class CreateHouseholds < ActiveRecord::Migration[6.1]
  def change
    create_table :households do |t|
      t.string  :name
      t.integer :address_id
      t.integer :people_count

      t.timestamps
    end
  end
end
