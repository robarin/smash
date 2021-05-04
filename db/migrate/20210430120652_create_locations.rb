class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.integer :type
      t.string :street_number
      t.string :city
      t.string :state
      t.string :zip
      t.text :description

      t.timestamps
    end
  end
end
