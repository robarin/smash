class CreatePersonEventAchievements < ActiveRecord::Migration[6.1]
  def change
    create_table :person_event_achievements do |t|
      t.references :person_event, null: false, foreign_key: true
      t.references :achievement, null: false, foreign_key: true

      t.timestamps
    end
  end
end
