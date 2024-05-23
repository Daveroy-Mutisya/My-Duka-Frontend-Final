import * as React from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // Import MUI Button

function createData(name, price, stock_quantity, buying_price, selling_price, store_id, image) {
  return { name, price, stock_quantity, buying_price, selling_price, store_id, image };
}

const rows = [
  createData('Product Name 1', 99.99, 100, 50.00, 99.99, 'Store_123', 'path_to_image'),
  createData('Product Name 2', 99.99, 100, 50.00, 99.99, 'Store_123', 'path_to_image'),
  createData('Product Name 3', 99.99, 100, 50.00, 99.99, 'Store_123', 'path_to_image'),
  createData('Product Name 4', 99.99, 100, 50.00, 99.99, 'Store_123', 'path_to_image'),
  createData('Product Name 5', 99.99, 100, 50.00, 99.99, 'Store_123', 'path_to_image'),
  createData('Product Name 6', 99.99, 100, 50.00, 99.99, 'Store_123', 'path_to_image'),
];

export default function ClerkDashboard() {
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "100%",
      overflowX: "hidden"
    },
    header: {
      marginBottom: "20px",
    },
    headerInner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#2196f3",
      color: "white",
      padding: "10px",
      borderRadius: "5px"
    },
    button: {
      cursor: "pointer",
      textDecoration: "none"
    },
    table: {
      backgroundColor: "#f5f5f5", // Light grey background for the table
    },
    tableHeader: {
      backgroundColor: "#e0e0e0", // Slightly darker grey for the header
    },
    tableCell: {
      color: "#333", // Dark grey text color for better contrast
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div style={{ fontWeight: "bold" }}>My Products</div>
          <Link to="/clerk/register-product" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#007FFF",
                color: "white",
                borderRadius: "8px",
                padding: "8px 16px",
                '&:hover': {
                  backgroundColor: "#0066CC"
                }
              }}
            >
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={styles.table} aria-label="simple table">
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              <TableCell sx={styles.tableCell}>Name</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Price ($)</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Stock Quantity</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Buying Price ($)</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Selling Price ($)</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Store ID</TableCell>
              <TableCell align="center" sx={styles.tableCell}>Image</TableCell>
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
  );
}