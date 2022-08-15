import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { getPayreqs, payreqSelectors } from './payreqsSlice';
import { getEmployees, employeeSelectors } from '../employees/employeesSlice';
import { getBucs, bucSelectors } from '../bucs/bucsSlice';

import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PayreqsList = () => {
  const dispatch = useDispatch();
  const payreqs = useSelector(payreqSelectors.selectAll);
  const employees = useSelector(employeeSelectors.selectAll);
  const bucs = useSelector(bucSelectors.selectAll);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getPayreqs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBucs());
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

  let employeesList;
  if (employees.length > 0) {
    employeesList = employees.map(employee => (
      <option key={employee.id} value={employee.id}>
        {employee.fullname}
      </option>
    ));
  } else {
    employeesList = <option>No employees found</option>;
  }

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

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Payreq</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="requestorName">
                <Form.Label>Requestor Name</Form.Label>
                <Form.Select>{employeesList}</Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="payreqNo">
                <Form.Label>Payreq No</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="payreqNo">
                <Form.Label>Approval Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Select>
                  <option value="Advance">Advance</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="remarks">
                <Form.Label>Remarks</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PayreqsList;
