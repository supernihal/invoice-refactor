class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.integer :invoice_number
      t.float :invoice_amount
      t.datetime :invoice_due_date
      t.integer :status
      t.bigint :borrower_id
      t.timestamps
    end
  end
end
