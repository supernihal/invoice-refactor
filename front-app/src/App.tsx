import { Routes, Route, Link } from 'react-router-dom'
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { Container, Navbar } from 'react-bootstrap';
import { InvoicePage } from './Pages/InvoicePage';
function App() {
  return (
    <>
      <Container>
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Link className="nav-link" to="/">Home</Link>
          </Container>
        </Navbar><br />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/invoices/:id" element={<InvoicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}
export default App;