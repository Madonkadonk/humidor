class CreateTempdata < ActiveRecord::Migration
  def change
    create_table :tempdata do |t|
      t.float :level
      t.float :humid
      t.float :temp

      t.timestamps
    end
  end
end
