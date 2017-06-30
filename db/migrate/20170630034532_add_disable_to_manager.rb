class AddDisableToManager < ActiveRecord::Migration[5.0]
  def change
    add_column :managers, :disable, :boolean
    add_column :managers, :password_digest, :string
  end
end
