class CreatePeople < ActiveRecord::Migration[6.1]
  def change
    create_table :people do |t|
      t.string :first_name, null: false, default: ''
      t.string :last_name, null: false, default: ''
      t.string :middle_name, null: false, default: ''

      t.datetime :birth_date

      t.timestamps
    end
  end
end
