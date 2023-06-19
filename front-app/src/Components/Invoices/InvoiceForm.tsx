import axios from "axios";
import { IInvoice, IBorrower } from "../../types/data";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { API_ROOT } from "../../constants";

export const InvoiceForm = (props: {
  updateInvoiceList: (invoice: IInvoice) => void;
}) => {
  const [invoice_number, setInvoiceNumber] = useState<number>(0);
  const [invoice_amount, setInvoiceAmount] = useState<number>(0);
  const [invoice_due_date, setInvoiceDueDate] = useState<Date>(new Date());
  const [borrower_id, setBorrowerId] = useState<number>(0);
  const [borrowers, setBorrowers] = useState<IBorrower[]>([]);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = () => {
    formRef?.current?.reset();
    setError({});
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    const invoiceData: IInvoice = {
      invoice_amount,
      invoice_due_date,
      invoice_number,
      borrower_id,
      scan: "dummy scan pdf path",
    };

    try {
      const response = await axios.post(`${API_ROOT}invoices`, invoiceData);

      props.updateInvoiceList(response.data);
      handleReset();
    } catch (error: any) {
      const { data } = error.response;
      setError(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ROOT}borrowers`);

        setBorrowers(response.data);
        setBorrowerId(response.data[0].id);
      } catch (error: any) {
        setError({ fetch: error.toString() });
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        
        <Form.Group>
          <Form.Label>Borrower</Form.Label>
          <Form.Select
            {...register("borrower_id", { required: true })}
            name="borrower_id"
            onChange={(e) => {
              setBorrowerId(parseInt(e.target.value));
            }}
          >
            {borrowers.map((borrower: IBorrower) => (
              <option value={borrower.id}>{borrower.name}</option>
            ))}
          </Form.Select>
          {errors?.invoice_number?.type === "required" && (
            <p>This field is required</p>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Invoice Number</Form.Label>
          <Form.Control
            {...register("invoice_number", { required: true })}
            type="number"
            name="invoice_number"
            onChange={(e) => setInvoiceNumber(parseInt(e.target.value))}
          />
          {errors?.invoice_number?.type === "required" && (
            <p>This field is required</p>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            {...register("invoice_amount", { required: true })}
            type="number"
            name="invoice_amount"
            onChange={(e) => setInvoiceAmount(parseFloat(e.target.value))}
          />
          {errors?.invoice_amount?.type === "required" && (
            <p>This field is required</p>
          )}
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            {...register("invoice_due_date", { required: true })}
            type="date"
            name="invoice_due_date"
            placeholder="Due Date"
            onChange={(e) => setInvoiceDueDate(new Date(e.target.value))}
          />
          {errors?.invoice_due_date?.type === "required" && (
            <p>This field is required</p>
          )}
        </Form.Group>

        <br />
        {error && (
          <>
            {Object.keys(error).map((errorKey) => (
              <Alert variant="danger">{errorKey}: {error[errorKey]}</Alert>
            ))}
          </>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <hr />
      </Form>
    </>
  );
};
