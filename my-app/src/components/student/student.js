import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const Student = () => {

    const navigate = useNavigate();
    const location = useLocation();
    let student = location.state;

    return (
        <>
            <div className="container" style={{maxWidth: '1030px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h1>Student</h1>
                    <Button style={{}} onClick={() => navigate('/')} variant="primary">Student list</Button>
                </div>
                <Row>
                    <Col><h6>Name</h6></Col>
                    <Col sm={10}>{student.name}</Col>
                </Row>
                <Row>
                    <Col><h6>Description</h6></Col>
                    <Col sm={10}>{student.description}</Col>
                </Row>
                <Row>
                    <Col><h6>Action</h6></Col>
                    <Col sm={10}>{student.action}</Col>
                </Row>
            </div>
        </>
    )
}
