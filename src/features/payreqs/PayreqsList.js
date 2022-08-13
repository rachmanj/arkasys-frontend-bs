import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { getPayreqs, payreqSelectors } from './payreqsSlice';

import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const PayreqsList = () => {
  const dispatch = useDispatch();
  const payreqs = useSelector(payreqSelectors.selectAll);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getPayreqs());
  }, [dispatch]);

  let content;
  content = payreqs.map(payreq => (
    <tr key={payreq.id}>
      <td>{payreq.id}</td>
      <td>{payreq.employee.fullname}</td>
      <td>{payreq.payreq_num}</td>
      <td>{payreq.payreq_type}</td>
      <td>
        <Moment format="DD-MM-YYYY">{payreq.approve_date}</Moment>
      </td>
      <td className="text-center">{payreq.payreq_idr.toLocaleString()}</td>
    </tr>
  ));

  return (
    <>
      <h3>Payment Request</h3>
      <Card>
        <Card.Header>
          <Button size="sm" onClick={handleShow}>
            Add Payreq
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Payreq No</th>
                <th>Type</th>
                <th>Appr Date</th>
                <th>IDR</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Payreq</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PayreqsList;
