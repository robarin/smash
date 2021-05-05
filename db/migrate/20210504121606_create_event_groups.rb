class CreateEventGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :event_groups do |t|
      t.references :event, foreign_key: true
      t.references :group, foreign_key: true
    end
  end
end
