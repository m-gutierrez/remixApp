import { Row, Col, Stack} from 'react-bootstrap';

export default function Body({ main, sidebar }) {
  return (
      <Row className="Content align-items-stretch 
      justify-content-center mx-1 flex-grow-1 mb-2"
      style={{minHeight:0,}}>
        <Col sm={12} md={8} 
        className="MainContent border rounded
        bg-body-secondary mx-2 overflow-auto h-100">
          <Stack>
            <div>
              {main}
            </div>
            <div className="d-sm-block d-md-none">
              {sidebar}
            </div>
          </Stack>
        </Col>
        <Col md={3} className="Sidebar border rounded 
        bg-body-secondary d-md-block d-none overflow-auto h-100">
          {sidebar}
        </Col>
      </Row>
  )
}