class AddUserToPeople < ActiveRecord::Migration[6.1]
  def change
    add_reference :people, :user, foreign_key: true
  end
end
