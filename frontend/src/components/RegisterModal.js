import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterModal = ({ show, onHide }) => {
  const [form, setForm] = useState({ name: '', email: '', className: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/students/register', form);
     if (res.data.success) {
        Swal.fire({
          title: 'Registration Successful!',
          text: 'Your Registration ID has been sent to your email.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
             window.location.href = 'http://localhost:3000/';
          }
        });

        setForm({ name: '', email: '', className: '' });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Registration</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={form.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Class Name</Form.Label>
            <Form.Control name="className" value={form.className} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Register</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
