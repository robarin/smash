class CreateSurveySessionAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :survey_session_answers do |t|
      t.references :session_survey, foreign_key: true
      t.references :question_response, foreign_key: true
      t.text :body

      t.timestamps
    end
  end
end
