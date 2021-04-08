class CreateQuestionTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :question_types do |t|
      t.string :name, null: false, default: ''
      t.string :description

      t.timestamps
    end
  end
end
