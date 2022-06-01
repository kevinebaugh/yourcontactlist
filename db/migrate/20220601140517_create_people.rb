class CreatePeople < ActiveRecord::Migration[6.1]
  def change
    create_table :people do |t|
      t.string  :name
      t.string  :email_address
      t.integer :household_id

      t.timestamps
    end
  end
end
