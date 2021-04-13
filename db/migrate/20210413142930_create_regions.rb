class CreateRegions < ActiveRecord::Migration[6.1]
  def change
    create_table :regions do |t|
      t.string :name, default: '', null: false
      t.references :country
      t.text :description

      t.timestamps
    end
  end
end
