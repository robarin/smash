class CreateEventNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :event_notes do |t|
      t.references :person_event, null: false, foreign_key: true
      t.datetime :note_date
      t.integer :type
      t.references :rating, null: false, foreign_key: true
      t.text :note_body

      t.timestamps
    end
  end
end
