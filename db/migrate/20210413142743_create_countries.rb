class CreateCountries < ActiveRecord::Migration[6.1]
  def change
    create_table :countries do |t|
      t.string :name, default: '', null: false
      t.string :abbrev
      t.text :description

      t.timestamps
    end
  end
end
