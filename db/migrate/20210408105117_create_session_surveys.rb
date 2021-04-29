class CreateSessionSurveys < ActiveRecord::Migration[6.1]
  def change
    create_table :session_surveys do |t|
      t.datetime :begin_date, null: false
      t.datetime :end_time

      t.references :person, foreign_key: true
      t.references :survey, foreign_key: true

      t.timestamps
    end
  end
end
