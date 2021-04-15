class AddPositionToSurveyQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :survey_questions, :position, :integer
  end
end
