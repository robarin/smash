class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :name, null: false, default: ''
      t.string :body, null: false, default: ''
      t.references :question_type, foreign_key: true

      t.timestamps
    end
  end
end
