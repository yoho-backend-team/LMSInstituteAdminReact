// ** MUI Components
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

// ** React Imports
import { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Student Name', minWidth: 170 },
  { id: 'code', label: 'Register No', minWidth: 100 },
  {
    id: 'Date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'Present',
    label: 'Present',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'Absent',
    label: 'Absent',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2)
  }
];
function createData(name, code, Date, Present) {
  const Absent = Date / Present;

  return { name, code, Date, Present, Absent };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679)
];
const StudentAttendanceViewPage = () => {
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid>
          <Card>
            <CardHeader title="Student Attendance" />
            <CardContent>
              <Typography sx={{ mb: 3.25, color: 'text.secondary' }}>
                Computers have become ubiquitous in almost every facet of our lives. At work, desk jockeys spend hours in front of their
                desktops, while delivery people scan bar codes with handhelds and workers in the field stay in touch.
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                If you’re in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here’s a rundown of some of the
                best systems available.
              </Typography>
            </CardContent>
            <CardActions className="card-action-dense">
              <Button>Read More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <Card style={{ height: '100%', backgroundColor: '#ffcccb' }}>
            <CardHeader title="Left Side" />
            <CardContent>
              <Typography sx={{ mb: 3.25, color: 'text.secondary' }}>Content for the left side goes here.</Typography>
              <Typography sx={{ color: 'text.secondary' }}>You can customize this content as needed.</Typography>
            </CardContent>
            <CardActions className="card-action-dense">
              <Button>Read More</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Card style={{ height: '100%', backgroundColor: '#b3e0ff' }}>
            <CardHeader title="Right Side" />
            <CardContent>
              <Typography sx={{ mb: 3.25, color: 'text.secondary' }}>Content for the right side goes here.</Typography>
              <Typography sx={{ color: 'text.secondary' }}>You can customize this content as needed.</Typography>
            </CardContent>
            <CardActions className="card-action-dense">
              <Button>Read More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Grid>
        <Box sx={{ mt: 5 }}>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Grid>
    </>
  );
};

export default StudentAttendanceViewPage;
