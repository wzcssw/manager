class CreateManagers < ActiveRecord::Migration[5.0]
  def change
    create_table :managers do |t|
      t.string :username
      t.string :realname
      t.string :phone
      t.integer :role
      t.timestamps
    end
    add_index :managers, :phone,unique: true, name: "idx_managers_phone"
    add_index :managers, :username, unique: true, name: "idx_managers_usrnme"
  end
end
