class AddAasmStateToInvoices < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :aasm_state, :string
  end
end
