class CreateGroupUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :group_users do |t|
      t.references :group, forein_key: true
      t.references :user, forein_key: true
      t.timestamps
    end
  end
end
