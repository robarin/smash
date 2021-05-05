class CreateSurveyQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :survey_questions do |t|
      t.string :body, null: false, default: ''
      t.references :survey, foreign_key: true
      t.integer :response_type, default: 0
      t.index :response_type
      t.integer :position

      t.timestamps
    end
  end
end
