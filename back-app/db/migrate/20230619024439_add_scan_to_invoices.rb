class AddScanToInvoices < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :scan, :string
  end
end
