import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Payreq-Support</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/payreqs">Payreq</Nav.Link>
          {/* <Nav.Link href="/bucs">BUC</Nav.Link> */}
          <Link to="/payreqs">Payreq via link</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
