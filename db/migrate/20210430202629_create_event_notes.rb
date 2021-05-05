class CreateEventNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :event_notes do |t|
      t.datetime :date
      t.text :body
      t.references :person_event, null: false, foreign_key: true
      t.references :rating, null: false, foreign_key: true

      t.timestamps
    end
  end
end
