class CreateGenders < ActiveRecord::Migration[6.1]
  def change
    create_table :genders do |t|
      t.string :name, null: false, default: ''
      t.text :description

      t.index :name

      t.timestamps
    end
  end
end
