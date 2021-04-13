class CreateProvinces < ActiveRecord::Migration[6.1]
  def change
    create_table :provinces do |t|
      t.string :name, default: '', null: false
      t.string :abbrev
      t.references :region
      t.text :description

      t.timestamps
    end
  end
end
