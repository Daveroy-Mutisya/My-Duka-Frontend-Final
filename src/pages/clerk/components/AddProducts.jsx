import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import clsx from 'clsx';

export default function AddProducts() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [productName, setProductName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [stockQuantity, setStockQuantity] = React.useState('');
  const [buyingPrice, setBuyingPrice] = React.useState('');
  const [sellingPrice, setSellingPrice] = React.useState('');
  const [storeId, setStoreId] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log({
      productName,
      price,
      stockQuantity,
      buyingPrice,
      sellingPrice,
      storeId,
      imageUrl
    });
    navigate('/clerk/dashboard'); // Navigate to /Products route
  };

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit}>
        <FormControl required value={productName} onChange={(e) => setProductName(e.target.value)}>
          <Label>Name</Label>
          <StyledInput placeholder="Product Name" />
        </FormControl>
        <FormControl required value={price} onChange={(e) => setPrice(e.target.value)}>
          <Label>Price</Label>
          <StyledInput placeholder="Price" />
        </FormControl>
        <FormControl required value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)}>
          <Label>Stock Quantity</Label>
          <StyledInput placeholder="Stock Quantity" />
        </FormControl>
        <FormControl required value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)}>
          <Label>Buying Price</Label>
          <StyledInput placeholder="Buying Price" />
        </FormControl>
        <FormControl required value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)}>
          <Label>Selling Price</Label>
          <StyledInput placeholder="Selling Price" />
        </FormControl>
        <FormControl required value={storeId} onChange={(e) => setStoreId(e.target.value)}>
          <Label>Store ID</Label>
          <StyledInput placeholder="Store ID" />
        </FormControl>
        <FormControl required value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}>
          <Label>Image URL (from Google)</Label>
          <StyledInput placeholder="Image URL (from Google)" />
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
  margin: auto;
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
