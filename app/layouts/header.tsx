import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink} from "@remix-run/react";


export function CollapsingNav() {
    return (
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav defaultActiveKey="/" 
        className="justify-content-end">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/recipes">Recipes</Nav.Link>
          <Nav.Link as={NavLink} to="/about">About</Nav.Link>
          <Nav.Link as={NavLink} to="/login">login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    );
}


export default function Header() {
  return (
    <Navbar expand='md' bg="dark" data-bs-theme="dark"
      className="Header bg-body-secondary px-3 mb-2 sticky-top">
      <Container fluid>
        <Navbar.Brand className="Header">MG</Navbar.Brand>
        <Navbar.Toggle aira-controls="basic-navbar-nav" />
        <CollapsingNav />
      </Container>
    </Navbar>
  );
}