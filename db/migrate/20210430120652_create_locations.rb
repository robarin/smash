class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.references :province, foreign_key: true
      t.string :city, null: false
      t.string :street_number
      t.string :zip
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
