import { Navbar, Nav, Container , Button} from 'react-bootstrap';
import { NavLink, Form} from "@remix-run/react";
import { useState } from 'react';
import { LoginModal } from "routes/auth.login"


export function Auth({ user }){
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
    {!user ? (
      <>
      <Nav.Link className="btn" 
        onClick={() => setModalShow(true)}>
          LogIn
        </Nav.Link>
        <LoginModal show={modalShow} 
          onHide={() => setModalShow(false)} />
      </>
      ) : (
      <Form action="/auth/logout" method="post">
        <button className="btn nav-link">
          Logout 
        </button>
      </Form> )
    }
    </>
  );
}

export function CollapsingNav({ user }){
  return (
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav defaultActiveKey="/" 
      className="justify-content-end">
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        <Nav.Link as={NavLink} to="/recipes">Recipes</Nav.Link>
        <Nav.Link as={NavLink} to="/denied">About</Nav.Link>
        <Auth user={user}/>
      </Nav>
    </Navbar.Collapse>
  )
}

export default function Header({ user }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Navbar expand='md' bg="dark" data-bs-theme="dark"
      className="Header bg-body-secondary py-0 px-3 mb-2 sticky-top">
      <Container fluid>
        <Navbar.Brand className="Header">MG</Navbar.Brand>
        <Navbar.Toggle aira-controls="basic-navbar-nav" />
        <CollapsingNav user={user}/>
      </Container>
    </Navbar>
  );
}
