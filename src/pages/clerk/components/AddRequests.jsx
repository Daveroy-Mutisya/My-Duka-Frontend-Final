import React, { useState } from 'react';
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
import ClerkSideBar from './ClerkSideBar'; 

export const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

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
    console.log('Form data:', formData);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage');
        return;
      }

      const response = await axios.post(`${BASE_URL}/store/${store_id}/requests`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
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
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div>
        <ClerkSideBar />
      </div>
      <div>
        <TableContainer component={Paper} className="bg-white p-8 rounded-lg">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Input</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>
                  <TextField
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>
                  <TextField
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Requester</TableCell>
                <TableCell>
                  <TextField
                    name="requester_name"
                    value={formData.requester_name}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Contact</TableCell>
                <TableCell>
                  <TextField
                    name="requester_contact"
                    value={formData.requester_contact}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>{formData.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
