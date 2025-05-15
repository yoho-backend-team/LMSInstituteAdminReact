// import React from 'react';
// import { Box, Typography, Grid, Divider } from '@mui/material';

// const SalarySlip = ({ rows }) => {
//   // Ensure rows is always treated as an array
//   const rowArray = Array.isArray(rows) ? rows : [rows];

//   if (!rowArray || rowArray.length === 0) {
//     return null;
//   }

//   console.log(rows,"rows")
//   return (
//     <Box sx={{ p: 2 }}>
//       {rowArray?.map((row, index) => (
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
//         <img src={'./favicon'} alt="logo" style={{ height: '50px',padding:2 }} />
//         <Box display="flex" flexDirection="column" alignItems="center" padding={2} width="100%">
            
//         <Typography variant="h6" color="black" align="center" gutterBottom fontSize={"14px"} fontWeight={700} fontFamily={"Inter"} sx={{ marginLeft:'-120px' }}>
//          Yoho Technologies
//         </Typography>
//         <Typography variant="h6" color="black" align="center" gutterBottom fontSize={"14px"} fontWeight={700} fontFamily={"Inter"} sx={{ marginLeft:'-120px' }}>
//           15s Keelikatalai Madipakkam
//         </Typography>
//         <Typography variant="h6" color="black" align="center" gutterBottom fontSize={"14px"} fontWeight={700} fontFamily={"Inter"} sx={{ marginLeft:'-120px' }}>
//           Chennai 600001
//         </Typography>
//         <Typography variant="h6" color="black" align="center" gutterBottom fontSize={"14px"} fontWeight={700} fontFamily={"Inter"} sx={{ marginLeft:'-120px' }}>
//           Salary Slip for Sep 2024
//         </Typography>
//           <Divider sx={{ my: 2 }} />
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Typography variant="subtitle1">Employee Name: {row?.staff?.username}</Typography>
//               <Typography variant="subtitle1">Employee Id: {row?.staff_type}</Typography>
//               <Typography variant="subtitle1">Location: {row?.staff_type}</Typography>
//               <Typography variant="subtitle1">Date of Joining: {row?.staff_type}</Typography>
//               <Typography variant="subtitle1">Department: {row?.staff_type}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="subtitle1">Account No: {row?.payment_date}</Typography>
//               <Typography variant="subtitle1">LOP: ₹{row?.salary_amount}</Typography>
//               <Typography variant="subtitle1">Working Days: ₹{row?.salary_amount}</Typography>
//               <Typography variant="subtitle1">Desigination: ₹{row?.salary_amount}</Typography>
//               <Typography variant="subtitle1">STD Days ₹{row?.salary_amount}</Typography>
//             </Grid>
//           </Grid>
//         </Box>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default SalarySlip;




import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material';

const SalarySlip = ({ rows,ref }) => {
  // Ensure rows is always treated as an array
  const rowArray = Array.isArray(rows) ? rows : [rows];

  if (!rowArray || rowArray.length === 0) {
    return null;
  }

  console.log(rows, 'rows');

  return (
    <Box ref={ref} id="salarySlip" sx={{ margin: '0 auto', border: '1px solid #ccc', fontFamily: 'Poppins', height: "842px",background:"#FFF" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: 2,paddingX: 2  }}>
        <Box >
        <img src={'./favicon.svg'} alt="Logo" style={{ height: '50px' }} />
        
      <Grid container spacing={2} width={'1000px'} sx={{ paddingX: 2 }}>
        <Grid item xs={12}>
        <Typography variant="h6" color="black" align="center" gutterBottom fontSize={"14px"} fontWeight={700} fontFamily={"Inter"} sx={{ marginLeft:'-120px' }}>
            Payslip
          </Typography>
        </Grid>

        <Grid item xs={12}>
        <Typography variant="h6" color="black" align="center" gutterBottom fontSize={"14px"} fontWeight={500} fontFamily={"Inter"} sx={{ marginBottom: '4px',marginLeft:"-100px"}}>Yoho Technologies</Typography>
        <Typography variant="h6" color="black" align="center" gutterBottom fontSize={"14px"} fontWeight={500} fontFamily={"Inter"} sx={{ marginBottom: '4px',marginLeft:"-100px" }}>madipakkam Road Keelkatalai</Typography>
        <Typography variant="h6" color="black" align="center" gutterBottom fontSize={"14px"} fontWeight={500} fontFamily={"Inter"} sx={{ marginBottom: '4px',marginLeft:"-100px" }}>Gateway Avenue</Typography>
        <Divider sx={{ marginY: '8px' }} />
        </Grid>

        <Grid item xs={6} sx={{p:2}}>
          <Typography variant="body1">Date of Joining: 2018-06-23</Typography>
          <Typography variant="body1">Pay Period: August 2021</Typography>
          <Typography variant="body1">Worked Days: 26</Typography>
        </Grid>
        <Grid item xs={6} textAlign='left'>
          <Typography variant="body1">Employee name: Sally Harley</Typography>
          <Typography variant="body1">Designation: Marketing Executive</Typography>
          <Typography variant="body1">Department: Marketing</Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Earnings</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Deductions</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Basic</TableCell>
                  <TableCell>10000</TableCell>
                  <TableCell>Provident Fund</TableCell>
                  <TableCell>1200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Incentive Pay</TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell>Professional Tax</TableCell>
                  <TableCell>500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>House Rent Allowance</TableCell>
                  <TableCell>400</TableCell>
                  <TableCell>Loan</TableCell>
                  <TableCell>400</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Meal Allowance</TableCell>
                  <TableCell>200</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Earnings</TableCell>
                  <TableCell>11600</TableCell>
                  <TableCell>Total Deductions</TableCell>
                  <TableCell>2100</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} align="center">
          <Typography variant="h6">Net Pay</Typography>
          <Typography variant="h6">9500</Typography>
          <Typography variant="body2">Nine Thousand Five Hundred</Typography>
        </Grid>

        <Grid item xs={6} align="center">
          <Typography variant="body1" paddingBottom={'48px'}>Employer Signature</Typography>
          <Divider style={{ width: "80%" }} />
        </Grid>
        <Grid item xs={6} align="center">
          <Typography variant="body1" paddingBottom={'48px'}>Employee Signature</Typography>
          <Divider style={{ width: "80%" }} />
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="body2" paddingBottom={'48px'}>
          All Rights Reserved Yoho Technologies
          </Typography>
        </Grid>
      </Grid>
    </Box>
    </Box>
    </Box>
  );
};

export default SalarySlip;
