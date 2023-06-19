import { useState, useEffect } from "react";
import { InvoiceForm } from "../Invoices/InvoiceForm";
import { IInvoice } from "../../types/data";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { API_ROOT, BADGE_VARIANT } from "../../constants";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";


export const InvoiceList = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [isUpdate, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    getInvoices();
    setUpdate(false);
  }, [isUpdate]);

  const getInvoices = async () => {
    try {
      const response = await axios.get(`${API_ROOT}invoices`);

      const data = response.data;

      setInvoices(data.reverse());
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateInvoiceList = (invoice: IInvoice) => {
    let _invoices = invoices;
    _invoices.unshift(invoice);
    setInvoices(_invoices);

    setUpdate(true);
  };

  return (
    <>
      <InvoiceForm updateInvoiceList={updateInvoiceList} />

      <h1>Invoices</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Invoice Amount</th>
            <th>Due Date</th>
            <th>Borrower</th>
            <th>State</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice: IInvoice, index) => (
            <tr key={invoice.id}>
              <td>{invoice.invoice_number}</td>
              <td>${invoice.invoice_amount}</td>
              <td>{invoice.invoice_due_date.toString()}</td>
              <td>{invoice?.borrower?.name}</td>
              <td><Badge bg={BADGE_VARIANT[invoice.aasm_state || 'created']}>{invoice.aasm_state}</Badge></td>
              <td><Link to={`/invoices/${invoice.id}`}>Open</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
