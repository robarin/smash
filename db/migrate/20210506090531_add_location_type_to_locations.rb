class AddLocationTypeToLocations < ActiveRecord::Migration[6.1]
  def change
    add_reference :locations, :location_type, foreign_key: true
  end
end
