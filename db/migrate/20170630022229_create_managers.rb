class CreateManagers < ActiveRecord::Migration[5.0]
  def change
    create_table :managers do |t|
      t.string :username
      t.string :realname
      t.string :phone
      t.integer :role
      t.timestamps
    end
    add_index :managers, :phone,unique: true, name: "x_m_phone"
    add_index :managers, :username, unique: true, name: "x_m_usrnme"
  end
end
