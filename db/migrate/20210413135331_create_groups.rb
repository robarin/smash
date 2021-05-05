class CreateGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :groups do |t|
      t.string :name, default: '', null: false
      t.text :description

      t.timestamps
    end
  end
end
