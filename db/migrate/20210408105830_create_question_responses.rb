class CreateQuestionResponses < ActiveRecord::Migration[6.1]
  def change
    create_table :question_responses do |t|
      t.string :name, null: false, default: ''
      t.text :description

      t.references :survey_question, foreign_key: true

      t.timestamps
    end
  end
end
