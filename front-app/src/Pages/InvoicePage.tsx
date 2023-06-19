import { useEffect, useState } from "react"
import { Invoice } from "../Components/Invoices/Invoice"
import { IInvoice, InvoiceState } from "../types/data"
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_ROOT } from "../constants";
export const InvoicePage = () => {
  const [data, setData] = useState<IInvoice | undefined>(undefined);
  const {id: invoiceId } = useParams();

  useEffect(() => {
    getInvoice();
  }, []);

  const getInvoice= async () => {
    try {
      
      const response = await axios.get(`${API_ROOT}invoices/${invoiceId}`);

      const data = response.data;
      setData(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  if (!data) {
    return <p>Error!</p>
  }

  return (<Invoice data={data} updateInvoice={(newState:InvoiceState) => setData({...data, aasm_state: newState})} />)
}