class CreateSurveys < ActiveRecord::Migration[6.1]
  def change
    create_table :surveys do |t|
      t.string :name, null: false, default: ''
      t.string :description

      t.timestamps
    end
  end
end
