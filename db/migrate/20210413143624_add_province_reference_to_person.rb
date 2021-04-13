class AddProvinceReferenceToPerson < ActiveRecord::Migration[6.1]
  def change
    add_reference :people, :province
  end
end
