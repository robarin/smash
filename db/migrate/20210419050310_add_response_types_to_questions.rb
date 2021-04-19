class AddResponseTypesToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :response_type, :integer, default: 0
  end
end
