// ** React Import
import { useState } from 'react';
import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, MenuItem, Button } from '@mui/material';
import OptionsMenu from 'components/option-menu';
import Icon from 'components/icon';
// ** renders client column
import DeleteDialog from 'components/modal/DeleteModel';
import StatusDialog from 'components/modal/DeleteModel';

const renderClient = () => { };

const Notes = ({ materials }) => {
  const [statusValue, setStatusValue] = useState(0);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusOpen, setStatusDialogOpen] = useState(false);

  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
    setStatusDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const columns = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 's_material_title',
      headerName: 'Title',
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.course_title}
              </Typography>
              <Typography noWrap variant="caption">
                {row.Subtitle}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.175,
      type: 'category',
      minWidth: 120,
      headerName: 'Category',
      field: 's_material_category',
      // valueGetter: params => new Date(params.value),
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {params.row.category}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: () => {
        return (
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
        );
      }
    },
    {
      flex: 0.125,
      field: 'actions',
      minWidth: 80,
      headerName: 'Actions',
      renderCell: () => (
        <OptionsMenu
          sx={{ '& .MuiButtonBase-root': { p: 0 } }}
          menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
          iconButtonProps={{ size: 'small', sx: { color: 'text.secondary', '& .MuiButtonBase-root': { p: 0 } } }}
          options={[
            {
              text: 'View',
              icon: <Icon icon="tabler:eye" fontSize={20} />,
              menuItemProps: {
                onClick: () => handleView()
              }
            },
            {
              text: 'Edit',
              icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
              menuItemProps: {
                onClick: () => toggleEditUserDrawer()
              }
            },
            {
              text: 'Delete',
              icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
              menuItemProps: {
                onClick: () => {
                  handleDelete();
                }
              }
            }
          ]}
        />
      )
    }
  ];
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  return (
    <Box>
      <DataGrid
        autoHeight
        rows={materials}
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
