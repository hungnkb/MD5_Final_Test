import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export const Table = () => {

    const [listStudent, setListStudent] = useState([]);
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [doneDelete, setDoneDelete] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setDeleteId(id)
        setShow(true)
    };

    useEffect(() => {
        const getStudents = async () => {
            let res = await axios.get('http://localhost:3000/students');
            if (res.data.length > 0) {
                setListStudent(res.data);
            }
        }
        getStudents()
    }, [doneDelete])

    const handleDelete = async () => {
        let res = await axios.delete(`http://localhost:3000/students/${deleteId}`);
        if (res) {
            setDoneDelete(!doneDelete);
            handleClose()
        }
    }

    return (
        <>
            <div className="container" style={{ maxWidth: '1120px' }}>
                <div className="row" style={{ display: 'flex' }}>
                    <h1 className="col" style={{}}>Student List</h1>
                    <Button type="button" onClick={() => navigate('/create')} variant='primary' className="col-auto" style={{ alignItems: 'center' }}>Create new student</Button>
                </div>
                <table className="table table-striped table-hove border mt-3">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '100px' }}>#</th>
                            <th scope="col" style={{ width: '250px' }}>Name</th>
                            <th scope="col" style={{ textAlign: 'end', width: '150px' }}>Description</th>
                            <th scope="col" style={{ textAlign: 'end', width: '200px' }}>Action</th>
                            <th scope="coll" style={{ width: '300px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listStudent.length > 0 &&
                            listStudent.map((s, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate(`/student/${s.id}`, { state: s })}>{s.name}</td>
                                    <td style={{ textAlign: 'end' }}>{s.description}</td>
                                    <td style={{ textAlign: 'end' }}>{s.action}</td>
                                    <td style={{ textAlign: 'end' }}>
                                        <button onClick={() => navigate(`/update/${s.id}`, { state: s })} style={{ marginRight: '10px' }} className="btn btn-primary">Update</button>
                                        <button onClick={() => handleShow(s.id)} className="btn btn-danger" style={{ width: '90px' }}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm to delete</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
