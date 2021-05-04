class CreatePersonEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :person_events do |t|
      t.references :event, null: false, foreign_key: true
      t.references :person, null: false, foreign_key: true
      t.references :role, null: false, foreign_key: true

      t.timestamps
    end
  end
end
