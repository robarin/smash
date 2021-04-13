class AddSurveyTypeToSurveys < ActiveRecord::Migration[6.1]
  def change
    add_reference :surveys, :survey_type, foreign_key: true
  end
end
