import { Box, Button, MenuItem, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { default as DeleteDialog, default as StatusDialog } from 'components/modal/DeleteModel';
import { useState } from 'react';

const Notes = ({ notes }) => {
  const [statusValue, setStatusValue] = useState(0);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusOpen, setStatusDialogOpen] = useState(false);

  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
    setStatusDialogOpen(true);
  };



  const columns = [
    {
      flex: 0.155,
      minWidth: 150,
      field: 'title',
      headerName: 'Title',
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.title}
            </Typography>
            {/* <Typography noWrap variant="caption">
              {row.description}
            </Typography> */}
          </Box>
        );
      }
    },
    {
      flex: 0.155,
      type: 'category',
      minWidth: 120,
      headerName: 'Category',
      field: 'category',
      renderCell: (params) => {
        const { row } = params;
        return (
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {row.description}
          </Typography>
        );
      }
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: () => (
        <Button variant="contained" color="success" size="small" sx={{ '&.MuiButton-root': { boxShadow: 'none' }, p: 0 }}>
          <TextField
            select
            fullWidth
            label=""
            SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
            width={100}
            size="small"
            sx={{ border: 'none !important' }}
          >
            <MenuItem value="0" sx={{ p: 1 }}>
              Active
            </MenuItem>
            <MenuItem value="1" sx={{ p: 1 }}>
              Deactive
            </MenuItem>
          </TextField>
        </Button>
      )
    },
  
  ];

  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  return (
    <Box>
      <DataGrid
        autoHeight
        rows={notes}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
      <StatusDialog open={statusOpen} setOpen={setStatusDialogOpen} description="Are you sure you want to Change Status" title="Status" />
    </Box>
  );
};

export default Notes;
