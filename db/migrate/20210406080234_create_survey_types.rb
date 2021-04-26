class CreateSurveyTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :survey_types do |t|
      t.string :name, null: false, default: ''
      t.text :description

      t.timestamps
    end
  end
end
