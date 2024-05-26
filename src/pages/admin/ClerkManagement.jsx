import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSideBar from './components/AdminSideBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Define the base URL for the API
export const BASE_URL = 'http://127.0.0.1:5000';

const AddClerk = ({ storeId }) => {
  // State hook to store the list of clerks
  const [clerks, setClerks] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    image: '',
    role: 'clerk'
  });

  // Effect hook to fetch clerks when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${BASE_URL}/store/${storeId}/clerks`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setClerks(data);
      })
      .catch(error => {
        console.error('Error fetching clerks:', error);
      });
  }, [storeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch(`${BASE_URL}/store/${storeId}/clerk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(newClerk => {
        setClerks([...clerks, newClerk]);
        setFormData({
          name: '',
          email: '',
          username: '',
          password: '',
          image: '',
          role: 'clerk'
        });
      })
      .catch(error => {
        console.error('Error adding clerk:', error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');

    fetch(`${BASE_URL}/store/${storeId}/clerks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setClerks(clerks.filter(clerk => clerk.id !== id));
      })
      .catch(error => {
        console.error('Error deleting clerk:', error);
      });
  };

  const styles = {
    container: {
      display: 'flex',
    },
    formContainer: {
      marginLeft: '250px',
      padding: '2rem',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#2d3748',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formInner: {
      maxWidth: '50rem',
      width: '100%',
      backgroundColor: '#1a202c',
      padding: '2.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      marginBottom: '3rem',
    },
    input: {
      appearance: 'none',
      borderRadius: '0.375rem',
      width: '100%',
      padding: '0.75rem',
      borderColor: '#cbd5e0',
      backgroundColor: '#edf2f7',
      color: '#2d3748',
      outline: 'none',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    submitButton: {
      display: 'flex',
      justifyContent: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      backgroundColor: '#4299e1',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.25rem',
      borderColor: 'transparent',
      cursor: 'pointer',
      outline: 'none',
    },
    table: {
      backgroundColor: "#f5f5f5",
    },
    tableHeader: {
      backgroundColor: "#e0e0e0",
    },
    tableCell: {
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <AdminSideBar />
      <div style={styles.formContainer}>
        <div style={styles.formInner}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '800', color: 'white' }}>New Clerk Registration</h2>
          <form style={{ marginTop: '2rem', display: 'grid', gridGap: '1.5rem' }} onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {['name', 'email', 'username', 'password', 'image'].map((field, index) => (
                <div key={index}>
                  <label htmlFor={field} className="sr-only" style={{ color: '#FFFFFF' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    id={field}
                    name={field}
                    type={field === 'password' ? 'password' : 'text'}
                    required
                    value={formData[field]}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="role" className="sr-only" style={{ color: '#FFFFFF' }}>Role</label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Role"
                  readOnly
                />
              </div>
            </div>
            <div>
              <button type="submit" style={styles.submitButton}>Register</button>
            </div>
          </form>
        </div>
        <ClerksTable clerks={clerks} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

const ClerksTable = ({ clerks, handleDelete }) => {
  const styles = {
    table: {
      backgroundColor: "#f5f5f5",
    },
    tableHeader: {
      backgroundColor: "#e0e0e0",
    },
    tableCell: {
      color: "#333",
    },
  };

  return (
    <TableContainer component={Paper} style={{ maxWidth: '50rem', width: '100%', borderRadius: '0.5rem', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2d3748', marginBottom: '1.5rem' }}>Clerk List</h2>
      <Table sx={styles.table} aria-label="clerk table">
        <TableHead sx={styles.tableHeader}>
          <TableRow>
            {['Name', 'Email', 'Username', 'Password', 'Image', 'Role', 'Actions'].map((heading) => (
              <TableCell key={heading} sx={styles.tableCell}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {clerks.map((clerk) => (
            <TableRow key={clerk.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={styles.tableCell}>{clerk.name}</TableCell>
              <TableCell sx={styles.tableCell}>{clerk.email}</TableCell>
              <TableCell sx={styles.tableCell}>{clerk.username}</TableCell>
              <TableCell sx={styles.tableCell}>{clerk.password}</TableCell>
              <TableCell sx={styles.tableCell}>{clerk.image}</TableCell>
              <TableCell sx={styles.tableCell}>{clerk.role}</TableCell>
              <TableCell sx={styles.tableCell}>
                <IconButton component={Link} to={`/admin/clerks/${clerk.id}`}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(clerk.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AddClerk;
