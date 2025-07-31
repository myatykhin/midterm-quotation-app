import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter } from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { FaReceipt, FaMoneyBillWave, FaPercent } from "react-icons/fa";
import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex, clearAll }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container sx={{ mt: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", fontWeight: 700, letterSpacing: 1 }}>
          <FaReceipt style={{ verticalAlign: "middle", marginRight: 8 }} />
          <b>Quotation</b>
        </Typography>
        <Typography variant="body1"><CiShoppingCart /> <b>No items</b></Typography>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => acc + (v.qty * v.ppu - (v.discount || 0)), 0);
  const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0);

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", fontWeight: 700, letterSpacing: 1, textShadow: "0 2px 8px #90caf9" }}>
        <FaReceipt style={{ verticalAlign: "middle", marginRight: 8 }} />
        <b>Quotation</b>
      </Typography>
      <Button
        variant="contained"
        color="error"
        startIcon={<MdClear />}
        onClick={clearAll}
        sx={{
          mb: 2,
          background: "linear-gradient(90deg, #e57373 0%, #f8bbd0 100%)",
          color: "#fff",
          fontWeight: 600,
          letterSpacing: 1,
          boxShadow: 3,
          '&:hover': {
            background: "linear-gradient(90deg, #b71c1c 0%, #f48fb1 100%)"
          }
        }}
      >
        <b>Clear</b>
      </Button>
      <TableContainer
        component={Paper}
        sx={{
          background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)" }}>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700 }}>-</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700 }}>Qty</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700 }}>Item</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700 }}>
                <FaMoneyBillWave style={{ verticalAlign: "middle", marginRight: 4 }} />
                Price/Unit
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700 }}>
                <FaPercent style={{ verticalAlign: "middle", marginRight: 4 }} />
                Discount
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700 }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              let amount = v.qty * v.ppu - (v.discount || 0);
              return (
                <TableRow
                  key={i}
                  sx={{
                    background: i % 2 === 0
                      ? "linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)"
                      : "linear-gradient(90deg, #f5f7fa 0%, #c3cfe2 100%)"
                  }}
                >
                  <TableCell align="center">
                    <BsFillTrashFill
                      style={{ cursor: "pointer", color: "#e53935" }}
                      onClick={() => handleDelete(i)}
                      title="Delete row"
                    />
                  </TableCell>
                  <TableCell align="center"><b>{v.qty}</b></TableCell>
                  <TableCell><b>{v.item}</b></TableCell>
                  <TableCell align="center"><b>{v.ppu}</b></TableCell>
                  <TableCell align="center"><b>{v.discount || 0}</b></TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    <span role="img" aria-label="money">💰</span> <b>{amount}</b>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ background: "linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)" }}>
              <TableCell colSpan={4} align="right" sx={{ fontWeight: 700 }}>
                <FaPercent style={{ verticalAlign: "middle", marginRight: 4 }} />
                <b>Total discount</b>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}><b>{totalDiscount}</b></TableCell>
              <TableCell />
            </TableRow>
            <TableRow sx={{ background: "linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)" }}>
              <TableCell colSpan={4} align="right" sx={{ fontWeight: 700 }}>
                <span role="img" aria-label="total">🧾</span> <b>Total</b>
              </TableCell>
              <TableCell />
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                <span role="img" aria-label="money">💵</span> <b>{total}</b>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;
