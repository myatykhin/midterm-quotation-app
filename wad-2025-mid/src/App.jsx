/*
TODO remove bootstrap and replace with MUI.
*/

import { useState, useRef } from "react";
import { Box, Button, Grid, TextField, MenuItem, Typography, Divider } from "@mui/material";
import QuotationTable from "./QuotationTable";
import productsData from "./products.json";

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();

  const products = productsData.products;
  const [dataItems, setDataItems] = useState(productsData.prefill || []);
  const [ppu, setPpu] = useState(products[0].price)
  const [discount, setDiscount] = useState(0);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code)

    const newItem = {
      item: item.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      discount: discount,
    };

    // Check for redundancy: same name and same price
    const idx = dataItems.findIndex(
      v => v.item === newItem.item && String(v.ppu) === String(newItem.ppu)
    );

    if (idx !== -1) {
      // Merge: sum qty and discount
      const updated = [...dataItems];
      updated[idx] = {
        ...updated[idx],
        qty: Number(updated[idx].qty) + Number(newItem.qty),
        discount: Number(updated[idx].discount) + Number(newItem.discount),
      };
      setDataItems(updated);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const clearAll = () => {
    setDataItems([]);
  }

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code)
    setPpu(item.price)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)",
              p: 3,
              borderRadius: 4,
              boxShadow: 4,
              border: "2px solid #90caf9",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "#1976d2",
                letterSpacing: 1,
                textShadow: "0 2px 8px #90caf9"
              }}
            >
              Add Item
            </Typography>
            <TextField
              select
              fullWidth
              inputRef={itemRef}
              defaultValue={products[0].code}
              onChange={productChange}
              size="small"
              margin="dense"
              sx={{ mb: 1, background: "#e3f2fd", borderRadius: 1 }}
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Price Per Unit"
              type="number"
              inputRef={ppuRef}
              value={ppu}
              onChange={e => setPpu(ppuRef.current.value)}
              fullWidth
              size="small"
              margin="dense"
              sx={{ mb: 1, background: "#e3f2fd", borderRadius: 1 }}
            />
            <TextField
              label="Quantity"
              type="number"
              inputRef={qtyRef}
              defaultValue={1}
              fullWidth
              size="small"
              margin="dense"
              sx={{ mb: 1, background: "#e3f2fd", borderRadius: 1 }}
            />
            <TextField
              label="Discount"
              type="number"
              value={discount}
              min={0}
              onChange={e => setDiscount(Number(e.target.value))}
              fullWidth
              size="small"
              margin="dense"
              sx={{ mb: 2, background: "#e3f2fd", borderRadius: 1 }}
            />
            <Divider sx={{ my: 2, borderColor: "#1976d2" }} />
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)",
                color: "#fff",
                fontWeight: 600,
                letterSpacing: 1,
                boxShadow: 3,
                mb: 1,
                '&:hover': {
                  background: "linear-gradient(90deg, #1565c0 0%, #42a5f5 100%)"
                }
              }}
              fullWidth
              onClick={addItem}
            >
              Add
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
