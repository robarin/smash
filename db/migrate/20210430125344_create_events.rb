class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :date
      t.references :location, null: false, foreign_key: true
      t.text :description

      t.timestamps
    end
  end
end
