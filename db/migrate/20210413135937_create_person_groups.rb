class CreatePersonGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :person_groups do |t|
      t.references :role
      t.references :person
      t.references :group

      t.datetime :begin_date
      t.datetime :end_date

      t.timestamps
    end
  end
end
