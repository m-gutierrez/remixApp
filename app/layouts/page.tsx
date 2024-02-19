import { Container, Row, Col} from 'react-bootstrap';
import Body from 'layouts/body';
import Header from 'layouts/header';

export default function Page({ sidebar, user, main }) {
  return (
    <Container fluid className='d-flex flex-column 
    m-0 px-0 bg-secondary bg-gradient vh-100'>
      <Header user={user}/>
      <Body
        main={main} 
        sidebar={sidebar}
      /> 
    </Container>
  );
}
