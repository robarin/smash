class CreateEventTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :event_types do |t|
      t.string :name, null: false, default: ''
      t.string :description

      t.timestamps
    end
  end
end
