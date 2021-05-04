class CreateAchievements < ActiveRecord::Migration[6.1]
  def change
    create_table :achievements do |t|
      t.string :name
      t.integer :type
      t.text :description

      t.timestamps
    end
  end
end
