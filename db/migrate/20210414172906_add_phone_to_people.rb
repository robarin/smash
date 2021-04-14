class AddPhoneToPeople < ActiveRecord::Migration[6.1]
  def change
    add_column :people, :phone, :string
    add_index :people, :phone
  end
end
