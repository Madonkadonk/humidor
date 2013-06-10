class CreateSaveddata < ActiveRecord::Migration
  def change
    create_table :saveddata do |t|
      t.float :level
      t.float :humid
      t.float :temp

      t.timestamps
    end
  end
end
