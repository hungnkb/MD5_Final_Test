import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const Create = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            action: '',
            description: '',
        },
        onSubmit: values => {
            axios.post('http://localhost:3000/students', values).then((response) => {
                if (response) {
                    formik.resetForm();
                    navigate('/')
                }
            })

        },
    });
    return (
        <>
            <div className="container">
                <h1>Create new student</h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="text">Name</label>
                    <input
                        className="form-control"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <div className="row mt-3">
                        <div className="col-6">
                            <label htmlFor="text">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="text">Action</label>
                            <textarea
                                className="form-control"
                                id="action"
                                name="action"
                                type="text"
                                placeholder='Action'
                                onChange={formik.handleChange}
                                value={formik.values.action}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleShow} type="button">Create</button>
                    <button className="btn btn-light mt-3" type='button' onClick={() => {navigate('/')}} style={{ backgroundColor: '#D8D8D8', marginLeft: '5px' }}>Cancel</button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Confirm to create</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={formik.handleSubmit}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </form>
            </div>


        </>
    )
}
