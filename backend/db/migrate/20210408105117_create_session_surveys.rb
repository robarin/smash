class CreateSessionSurveys < ActiveRecord::Migration[6.1]
  def change
    create_table :session_surveys do |t|
      t.references :session, foreign_key: true
      t.references :survey, foreign_key: true

      t.timestamps
    end
  end
end
