class AddGenderReferenceToPerson < ActiveRecord::Migration[6.1]
  def change
    add_reference :people, :gender, foreign_key: true
  end
end
