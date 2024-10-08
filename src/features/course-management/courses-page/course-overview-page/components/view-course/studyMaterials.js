import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
import { default as DeleteDialog } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CourseStudyMaterialView from './CourseStudyMaterialView';

const StudyMaterials = ({ materials }) => {
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRow(params);
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
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
          <Box sx={{ my: 2 }}>
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
      minWidth: 180,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions row={row} />
    }
  ];

  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  return (
    <Box>
      <DataGrid
        autoHeight
        rows={materials || []}
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
      <CourseStudyMaterialView open={isViewModalOpen} handleViewClose={handleViewClose} StudyMaterials={selectedRow} />
    </Box>
  );
};

StudyMaterials.propTypes = {
  materials: PropTypes.any
};

export default StudyMaterials;
