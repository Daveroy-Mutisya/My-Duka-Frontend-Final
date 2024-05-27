import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AdminSideBar from './components/AdminSideBar';

const initialPayments = [
  { id: 1, productName: 'Milk', storeId: 1, status: 'Paid', amount: 100, method: 'Credit Card', dueDate: '2024-05-28' },
  { id: 2, productName: 'Salt', storeId: 2, status: 'not paid', amount: 150, method: 'PayPal', dueDate: '2024-05-30' },
  { id: 3, productName: 'Bread', storeId: 3, status: 'Paid', amount: 200, method: 'cash', dueDate: '2024-06-01' },
];

export default function ClerkDashboard() {
  const [payments, setPayments] = useState(initialPayments);

  const handleDelete = (id) => {
    setPayments(payments.filter(payment => payment.id !== id));
  };

  const styles = {
    container: {
      display: 'flex',
      maxWidth: '100%',
      overflowX: 'hidden'
    },
    mainContent: {
      flexGrow: 1,
      padding: '20px',
      marginLeft: '250px', // Adjusted to account for sidebar width
    },
    header: {
      marginBottom: '20px',
    },
    headerInner: {
      display: 'flex',
      justifyContent: 'center', // Align the text at the center
      backgroundColor: '#000000', // Red background for the header
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      width: 'fit-content', // Adjust the width to fit the content
      margin: '0 auto', // Center the header text
    },
    button: {
      cursor: 'pointer',
      textDecoration: 'none'
    },
    table: {
      backgroundColor: '#ffffff', // White background for the table
    },
    tableHeader: {
      backgroundColor: '#000000', // Black background for the header
    },
    tableCellHeader: {
      color: '#FFFFFF', // Red text color for the header
      fontWeight: 'bold'
    },
    tableCell: {
      color: '#000000', // Black text color for better contrast
    },
    deleteButton: {
      backgroundColor: 'red', // Red background for the delete button
      color: 'white', // White text color for better contrast
    },
  };

  return (
    <div style={styles.container}>
      <AdminSideBar />
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.headerInner}>
            <div style={{ fontWeight: 'bold' }}>CLERK DASHBOARD</div>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={styles.table} aria-label="simple table">
            <TableHead sx={styles.tableHeader}>
              <TableRow>
                <TableCell sx={styles.tableCellHeader}>Product Name</TableCell>
                <TableCell align="right" sx={styles.tableCellHeader}>Store ID</TableCell>
                <TableCell align="right" sx={styles.tableCellHeader}>Status</TableCell>
                <TableCell align="right" sx={styles.tableCellHeader}>Amount</TableCell>
                <TableCell align="right" sx={styles.tableCellHeader}>Method</TableCell>
                <TableCell align="center" sx={styles.tableCellHeader}>Due Date</TableCell>
                <TableCell align="center" sx={styles.tableCellHeader}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell component="th" scope="row" sx={styles.tableCell}>
                    {payment.productName}
                  </TableCell>
                  <TableCell align="right" sx={styles.tableCell}>{payment.storeId}</TableCell>
                  <TableCell align="right" sx={styles.tableCell}>{payment.status}</TableCell>
                  <TableCell align="right" sx={styles.tableCell}>{payment.amount}</TableCell>
                  <TableCell align="right" sx={styles.tableCell}>{payment.method}</TableCell>
                  <TableCell align="center" sx={styles.tableCell}>{payment.dueDate}</TableCell>
                  <TableCell align="center" sx={styles.tableCell}>
                    <Button onClick={() => handleDelete(payment.id)} variant="contained" style={styles.deleteButton}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}