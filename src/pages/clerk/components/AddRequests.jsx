import React, { useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:5000';

export default function AddRequestTable({ store_id, fetchRequests }) {
  const [formData, setFormData] = useState({
    product_name: '',
    quantity: '',
    requester_name: '',
    requester_contact: '',
    status: 'pending' // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/store/${store_id}/requests`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Request added:', response.data);
      fetchRequests(); // Fetch updated requests after adding a new one
      // Reset form data after submission
      setFormData({
        product_name: '',
        quantity: '',
        requester_name: '',
        requester_contact: '',
        status: 'pending' // Reset status to default
      });
    } catch (error) {
      console.error('Error adding request:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Requester</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="requester_name"
                value={formData.requester_name}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="requester_contact"
                value={formData.requester_contact}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>{formData.status}</TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
