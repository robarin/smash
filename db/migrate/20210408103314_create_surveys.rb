class CreateSurveys < ActiveRecord::Migration[6.1]
  def change
    create_table :surveys do |t|
      t.string :name, null: false, default: ''
      t.text :description

      t.references :survey_type, foreign_key: true

      t.timestamps
    end
  end
end
