import { Box,Card, CardContent, Grid, IconButton,Pagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
import { default as DeleteDialog } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CourseNotesView from './CourseNotesView';

const Notes = ({ notes=[] }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [page, setPage] = useState(1);
  const pageSize = 6; 

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const RowOptions = ({ row }) => {
    return (
      <OptionsMenu
        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          {
            text: 'View',
            icon: <Icon icon="tabler:eye" fontSize={20} />,
            menuItemProps: {
              onClick: () => {
                setViewModalOpen(true);
                handleRowClick(row);
              }
            }
          },
          ,
          {
            text: 'Delete',
            icon: <Icon icon="tabler:trash" fontSize={20} />,
            menuItemProps: {
              onClick: () => {
                setDeleteDialogOpen(true);
                handleRowClick(row);
              }
            }
          }
        ]}
      />
    );
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
          <Box sx={{ alignItems: 'center' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.title}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 0.155,
      type: 'description',
      minWidth: 120,
      headerName: 'Description',
      field: 'description',
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
      // flex: 0.4,
      minWidth: 180,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions row={row} />
    }
  ];

  // const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const paginatedNotes = notes.slice((page - 1) * pageSize, page * pageSize);


  return (
    <Box>
      {/* <DataGrid
        autoHeight
        rows={notes}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      /> */}

<Grid container spacing={3}>
        {paginatedNotes.map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row.id}>

            <Card  sx={{
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(to bottom right, white, #f9fafb)',
                border: '1px solid #e5e7eb',
                '&:hover': {
                  boxShadow: 6, // Equivalent to hover:shadow-lg
                  transform: 'translateY(-4px)', // Equivalent to hover:-translate-y-1
                  background: 'linear-gradient(to bottom right, rgba(0,123,255,0.05), rgba(0,123,255,0.1))'
                }
              }}>

              <CardContent>
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Typography variant="h3" sx={{ fontWeight: 600,color: 'text.primary' }}>
                  {row.title}
                </Typography>

                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      setViewModalOpen(true);
                      handleRowClick(row);
                    }}
                  >
                    <Icon icon="tabler:eye" fontSize={20} />
                  </IconButton>

</Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2, color: 'gray', transition: 'color 0.3s',
                    '&:hover': { color: 'text.primary' } }}>
                  {row.description}
                </Typography>

                <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                  <RowOptions row={row} />
                 
                </Box>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


{/* Pagination */}
<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(notes.length / pageSize)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
      <CourseNotesView open={isViewModalOpen} handleViewClose={handleViewClose} notes={selectedRow} />
    </Box>
  );
};

Notes.propTypes = {
  notes: PropTypes.any
};
export default Notes;
