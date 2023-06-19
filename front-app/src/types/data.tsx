export enum InvoiceState {
    created = "created",
    approved = "approved",
    rejected = "rejected",
    purchased = "purchased",
    closed = "closed"
}
export interface IInvoice {
  id?: number;
  borrower_id: number;
  borrower?: IBorrower;
  aasm_state?: InvoiceState;
  invoice_number: number;
  invoice_amount: number;
  invoice_due_date: Date;
  scan: string;
}

export interface IBorrower {
    id: number;
    name: string;
}