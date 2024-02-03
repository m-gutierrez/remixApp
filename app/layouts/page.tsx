import { Container } from 'react-bootstrap';
import Header from 'layouts/header';
import Body from 'layouts/body';

export default function Page({ main, sidebar }) {
  return (
    <Container fluid className='d-flex flex-column 
      m-0 px-0 bg-secondary bg-gradient vh-100'>      
      <Header />
      <Body 
        main={main} 
        sidebar={sidebar}
      />
    </Container>
  )
}


