class CreateQuestionResponses < ActiveRecord::Migration[6.1]
  def change
    create_table :question_responses do |t|
      t.references :question, foreign_key: true
      t.references :response, foreign_key: true

      t.timestamps
    end
  end
end
