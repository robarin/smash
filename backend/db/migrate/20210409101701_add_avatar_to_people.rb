class AddAvatarToPeople < ActiveRecord::Migration[6.1]
  def change
    add_column :people, :avatar, :string
  end
end
