import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import axios from 'axios'; // Import axios for HTTP requests
import ClerkSideBar from './ClerkSideBar';

// Define the base URL for the API
export const BASE_URL = 'http://127.0.0.1:5000';

export default function AddProducts() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [productName, setProductName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [stockQuantity, setStockQuantity] = React.useState('');
  const [buyingPrice, setBuyingPrice] = React.useState('');
  const [sellingPrice, setSellingPrice] = React.useState('');
  const [storeId, setStoreId] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const product = {
      productName,
      price,
      stockQuantity,
      buyingPrice,
      sellingPrice,
      storeId,
      imageUrl
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/products`, product, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Product added:', response.data);
      navigate('/clerk/dashboard'); // Navigate to /clerk/dashboard route
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit}>
        <FormControl required>
          <Label>Name</Label>
          <StyledInput
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormControl>
        <FormControl required>
          <Label>Price</Label>
          <StyledInput
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <FormControl required>
          <Label>Stock Quantity</Label>
          <StyledInput
            placeholder="Stock Quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </FormControl>
        <FormControl required>
          <Label>Buying Price</Label>
          <StyledInput
            placeholder="Buying Price"
            value={buyingPrice}
            onChange={(e) => setBuyingPrice(e.target.value)}
          />
        </FormControl>
        <FormControl required>
          <Label>Selling Price</Label>
          <StyledInput
            placeholder="Selling Price"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </FormControl>
        <FormControl required>
          <Label>Store ID</Label>
          <StyledInput
            placeholder="Store ID"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
          />
        </FormControl>
        <FormControl required>
          <Label>Image URL (from Google)</Label>
          <StyledInput
            placeholder="Image URL (from Google)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </FormControl>
        <HelperText />
        <Button type="submit" variant="contained" disableElevation>
          Submit
        </Button>
      </form>
    </StyledDiv>
  );
}

const StyledDiv = styled('div')`
  background-color: #DAECFF;
  padding: 16px;
  max-width: 360px;
  margin: 50px auto; /* Added top margin */
  border-radius: 8px;
  box-sizing: border-box;
  max-height: 90vh; /* Ensure the container fits within the viewport */
  overflow-y: auto; /* Make the container scrollable */

  /* Hide the scrollbar initially */
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: transparent transparent; /* For Firefox */

  &::-webkit-scrollbar {
    width: 8px; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Make scrollbar thumb transparent */
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Show scrollbar thumb on hover */
  }

  &:hover::-webkit-scrollbar {
    width: 8px; /* Show scrollbar on hover */
  }

  /* Ensure it works on older versions of Safari and other webkit browsers */
  &::-webkit-scrollbar-track {
    background: transparent; /* Make scrollbar track transparent */
  }
`;

const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: 100%;
    max-width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${grey[200]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    &:hover {
      border-color: ${blue[400]};
    }
    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
    margin-bottom: 12px;
    box-sizing: border-box;
  }
`,
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
      {children}
      {required ? ' *' : ''}
    </p>
  );
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
