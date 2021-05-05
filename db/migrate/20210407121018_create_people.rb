class CreatePeople < ActiveRecord::Migration[6.1]
  def change
    create_table :people do |t|
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.string :phone
      t.string :avatar
      t.integer :role, default: 0

      t.datetime :birth_date

      t.timestamps
    end

    add_index :people, :phone
  end
end
