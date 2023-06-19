import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IInvoice, InvoiceState } from "../../types/data";
import { Button } from "react-bootstrap";
import axios from "axios";
import { API_ROOT } from "../../constants";
import { useConfirm } from "../../hooks";
import { Link } from "react-router-dom";
export const Invoice = ({ data, updateInvoice }: { data: IInvoice, updateInvoice: (newState: InvoiceState) => void }) => {
  const { id: invoiceId } = data;
  const handleApprove = async () => {
    try {
      await axios.patch(
        `${API_ROOT}invoices/${invoiceId}/approve`
      );
      updateInvoice(InvoiceState.approved);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(
        `${API_ROOT}invoices/${invoiceId}/reject`
      );
      updateInvoice(InvoiceState.rejected);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handlePurchase = async () => {
    try {
      await axios.patch(
        `${API_ROOT}invoices/${invoiceId}/purchase`
      );
      updateInvoice(InvoiceState.purchased);
    } catch (error: any) {
      console.log(error);
    }
  };

  const confirmPurcase = useConfirm(
    'Are you sure you want to purchase the invocie?',
    handlePurchase,
    () => {},
  );

  const handleClose = async () => {
    try {
      await axios.patch(
        `${API_ROOT}invoices/${invoiceId}/close`
      );
      updateInvoice(InvoiceState.closed);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Invoice</h2>
        </Col>
        <Col>
          <Link to="/">Back</Link>
        </Col>
      </Row>
      <Row>
        <Col>Invoice #.</Col>
        <Col>{data.invoice_number}</Col>
      </Row>
      <Row>
        <Col>Due Date</Col>
        <Col>{data.invoice_due_date.toString()}</Col>
      </Row>
      <Row>
        <Col>Scan</Col>
        <Col>{data.scan}</Col>
      </Row>
      <Row>
        <Col>Fees Accrued</Col>
        <Col>${data.invoice_amount}</Col>
      </Row>
      <Row>
        <Col>State</Col>
        <Col>
          <Badge>{data.aasm_state}</Badge>
        </Col>
      </Row>
      <Row>
        <Col>
          {data.aasm_state === InvoiceState.created && (
            <>
              <Button variant="success" onClick={handleApprove}>
                Approve
              </Button>{" "}
              <Button variant="danger" onClick={handleReject}>
                Reject
              </Button>
            </>
          )}
          {data.aasm_state === InvoiceState.approved && (
            <Button variant="success" onClick={confirmPurcase}>
              Purchase
            </Button>
          )}
          {data.aasm_state === InvoiceState.purchased && (
            <>
              <Button variant="success" onClick={handleClose}>
                Close
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
