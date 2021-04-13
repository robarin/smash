class CreateSurveyTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :survey_types do |t|
      t.string :name, null: false, default: ''
      t.string :description

      t.timestamps
    end
  end
end
