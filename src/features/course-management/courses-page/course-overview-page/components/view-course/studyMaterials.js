// ** React Import
import { useState } from 'react';
import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, MenuItem, Button } from '@mui/material';
// ** renders client column
import DeleteDialog from 'components/modal/DeleteModel';
import StatusDialog from 'components/modal/DeleteModel';

// const renderClient = () => { };

const StudyMaterials = ({ materials }) => {
  const [statusValue, setStatusValue] = useState(0);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusOpen, setStatusDialogOpen] = useState(false);

  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
    setStatusDialogOpen(true);
  };
  console.log(statusValue);


  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  return (
    <Box>
      {materials && (
        <DataGrid
          autoHeight
          rows={materials}
          columns={columns}
          checkboxSelection
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      )}
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

export default StudyMaterials;
