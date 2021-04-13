class CreateRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :roles do |t|
      t.string :name, default: '', null: false
      t.text :description

      t.timestamps
    end
  end
end
