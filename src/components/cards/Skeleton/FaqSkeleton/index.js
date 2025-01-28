import { Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// import CustomAvatar from 'components/mui/avatar';
// import ReactApexCharts from 'react-apexcharts';
// import { gridSpacing } from 'store/constant';
import CustomSkeleton from '..';

const FaqSkeleton = () => {
  return (
    <Grid container spacing={2}>
    <Grid item xs={12} sm={12}>
      <Table sx={{
        "& .MuiTableCell-body:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)": {
          py: 2, 
        },
      }}>

             <TableRow sx={{  height: "56px", borderBottom: "1px solid #e6e5e7", backgroundColor: "#F6F6F7", }}>
               <TableCell sx={{ width: "120px"}} ><CustomSkeleton width={100} height={36} /></TableCell>
               <TableCell sx={{ width: "140px"}}> <CustomSkeleton width={100} height={36} /> </TableCell>
               <TableCell sx={{ width: "120px"}} > <CustomSkeleton width={160} height={36} /> </TableCell>
               <TableCell sx={{ width: "100px" }}> <CustomSkeleton width={140} height={36} /> </TableCell>
               <TableCell sx={{ width: "100px" }}> <CustomSkeleton width={140} height={36} /> </TableCell>
             </TableRow>
           <TableBody>
           <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={15} /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}} >
               <TableCell> <CustomSkeleton width={80} height={15}  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={15}  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={15}  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={15}  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={15}  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={15}  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={15}  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={15}  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={15}  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={15} /> </TableCell>
             </TableRow>
           </TableBody>
      </Table>
    </Grid>
  </Grid>
  );
};

export default FaqSkeleton;