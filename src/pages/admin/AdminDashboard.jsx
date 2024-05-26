import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // Import MUI Button
import AdminSideBar from './components/AdminSideBar';

function createData(name, price, stock_quantity, buying_price, selling_price, store_id, image) {
  return { name, price, stock_quantity, buying_price, selling_price, store_id, image };
}

const rows = [
  createData('Product Name 1', 99.99, 100, 50.00, 99.99, '', 'path_to_image'),
  createData('Product Name 2', 99.99, 100, 50.00, 99.99, '', 'path_to_image'),
  createData('Product Name 3', 99.99, 100, 50.00, 99.99, '', 'path_to_image'),
  createData('Product Name 4', 99.99, 100, 50.00, 99.99, '', 'path_to_image'),
  createData('Product Name 5', 99.99, 100, 50.00, 99.99, '', 'path_to_image'),
  createData('Product Name 6', 99.99, 100, 50.00, 99.99, '', 'path_to_image'),
];

export default function ClerkDashboard() {
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
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#d32f2f', // Red background for the header
      color: 'white',
      padding: '10px',
      borderRadius: '5px'
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
      color: '#d32f2f', // Red text color for the header
      fontWeight: 'bold'
    },
    tableCell: {
      color: '#000000', // Black text color for better contrast
    },
  };

  return (
    <div style={styles.container}>
      <AdminSideBar />
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.headerInner}>
            <div style={{ fontWeight: 'bold' }}>CLERK DASHBOARD</div>
            <Link to="/admin/add-payments" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#b71c1c',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  '&:hover': {
                    backgroundColor: '#8e0000'
                  }
                }}
              >
                Add Payments
              </Button>
            </Link>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={styles.table} aria-label="simple table">
            <TableHead sx={styles.tableHeader}>
              <TableRow>
                <TableCell sx={styles.tableCellHeader}>Name</TableCell>
                <TableCell align="right" sx={styles.tableCellHeader}>Price ($)</TableCell>
                <TableCell align="right" sx={styles.tableCellHeader}>Stock Quantity</TableCell>
                <TableCell align="right" sx={styles.tableCellHeader}>Buying Price ($)</TableCell>
                <TableCell align="right" sx={styles.tableCellHeader}>Selling Price ($)</TableCell>
                <TableCell align="right" sx={styles.tableCellHeader}>Store ID</TableCell>
                <TableCell align="center" sx={styles.tableCellHeader}>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={styles.tableCell}>
                    {row.name}
                  </TableCell>
                  <TableCell align="right" sx={styles.tableCell}>{row.price}</TableCell>
                  <TableCell align="right" sx={styles.tableCell}>{row.stock_quantity}</TableCell>
                  <TableCell align="right" sx={styles.tableCell}>{row.buying_price}</TableCell>
                  <TableCell align="right" sx={styles.tableCell}>{row.selling_price}</TableCell>
                  <TableCell align="right" sx={styles.tableCell}>{row.store_id}</TableCell>
                  <TableCell align="center" sx={styles.tableCell}>
                    <img src={row.image} alt="product image" width="50px" />
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
