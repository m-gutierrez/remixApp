import { Link, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import {Container} from 'react-bootstrap';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  const posts = useLoaderData();

  return (
    <Container fluid className='d-flex flex-column 
    m-0 px-0 min-vh-100 bg-secondary bg-gradient'>
    </Container>
  );
}
