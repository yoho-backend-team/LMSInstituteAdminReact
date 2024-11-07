import { Box, Card, CardContent, CardHeader, Grid, Table,TableHead, TableCell, TableBody, TableRow} from '@mui/material';
import CustomSkeleton from '..';
// import CustomAvatar from 'components/mui/avatar';
// import ReactApexCharts from 'react-apexcharts';
// import { gridSpacing } from 'store/constant';

const StudentAttendanceViewSkeleton = () => {
  return (
    <>
    <Grid container spacing={2} sx={{ p: 1 }}>
      {/* First Card */}
        {Array.from({ length: 6 }).map((_, i) => ( 
                 <Grid item  xs={6} sm={4} md={1.793} key={i} >
                    <CustomSkeleton width={174} height={96} />
                 </Grid>
        ))} 

    </Grid>
    <Table size="medium" sx={{ width: "95%", backgroundColor: "white", marginTop: "30px", borderCollapse: 'collapse' , "& .MuiTableCell-root": { color: "#474747", borderBottom: '1px solid #ddd', borderRadius: "8px" }  }}>
      <TableHead  >
        <TableRow >
          <TableCell sx={{  padding: 1 }}>
            <Box sx={{ width: 100 }}>
              <CustomSkeleton className="custom-skeleton" variant="text" sx={{ height: 25 }} />
            </Box>
          </TableCell>
          <TableCell sx={{  padding: 1 }}>
            <Box sx={{ width: 200 }}>
              <CustomSkeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </Box>
          </TableCell>
          <TableCell sx={{  padding: 1 }}>
            <Box sx={{ width: 150 }}>
              <CustomSkeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </Box>
          </TableCell>
          {/* <TableCell sx={{  padding: 1 }}>
            <Box sx={{ width: 100 }}>
              <CustomSkeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </Box>
          </TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell sx={{  padding: 1 }}>
              <CustomSkeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </TableCell>
            <TableCell sx={{  padding: 1 }}>
              <CustomSkeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </TableCell>
            <TableCell sx={{  padding: 1 }}>
              <CustomSkeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </TableCell>
            {/* <TableCell sx={{  padding: 1 }}>
              <CustomSkeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
};

export default StudentAttendanceViewSkeleton;
