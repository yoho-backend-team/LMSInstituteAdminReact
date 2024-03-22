// ** React Imports
import { useCallback, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
// ** Custom Components Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import { default as StatusChangeDialog, default as StudentCertificateDeleteModel } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import StudentCertificateAddDrawer from 'features/certificate-management/student-certificates/components/StudentCertificateAddDrawer';
import StudentCertificateEdit from 'features/certificate-management/student-certificates/components/StudentCertificateEdit';
import StudentCertificateTableHeader from 'features/certificate-management/student-certificates/components/StudentCertificateTableHeader';
import StudentCertificateView from 'features/certificate-management/student-certificates/components/StudentCertificateView';
import { selectStudentCertificates } from 'features/certificate-management/student-certificates/redux/studentCertificateSelectors';
import { getAllStudentCertificates } from 'features/certificate-management/student-certificates/redux/studentCertificateThunks';
import { setStudentCertificates } from 'features/certificate-management/student-certificates/redux/studentCertificateSlice';
import { searchStudentCertificates } from 'features/certificate-management/student-certificates/services/studentCertificateServices';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudentCertificateStatus } from 'features/certificate-management/student-certificates/services/studentCertificateServices';
import { deleteStudentCertificate } from 'features/certificate-management/student-certificates/services/studentCertificateServices';
import CustomAvatar from 'components/mui/avatar';
import { getInitials } from 'utils/get-initials';
import toast from 'react-hot-toast';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const userStatusObj = {
  1: 'success',
  0: 'error'
};

const StudenrCertificate = () => {
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const [studentCertificateRefetch, setStudentCertificateRefetch] = useState(false);

  const [studentCertificateDeleteModelOpen, setStudentCertificateDeleteModelOpen] = useState(false);

  const [selectedStudentCertificateDeleteId, setSelectedStudentCertificateDeleteId] = useState(null);

  const renderClient = (row) => {
    if (row?.institution_users?.image) {
      return (
        <CustomAvatar
          src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.institution_users?.image}`}
          sx={{ mr: 2.5, width: 38, height: 38 }}
        />
      );
    } else {
      return (
        <CustomAvatar
          skin="light"
          sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
        >
          {getInitials(row?.name ? row?.name : 'Mohammed Thasthakir')}
        </CustomAvatar>
      );
    }
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateStudentCertificateStatus(data);
    if (response.success) {
      toast.success(response.message);
      setStudentCertificateRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, users) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(users);
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
  };
  const handleView = () => {
    setViewModalOpen(true);
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  const dispatch = useDispatch();
  const studentCertificates = useSelector(selectStudentCertificates);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllStudentCertificates(data));
  }, [dispatch, selectedBranchId, studentCertificateRefetch]);

  console.log('certificate', studentCertificates);


  // Memoize the handleDelete function to prevent unnecessary re-renders
  const handleDelete = useCallback((itemId) => {
    setSelectedStudentCertificateDeleteId(itemId);
    setStudentCertificateDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleStudentCertificateDelete = async () => {
    const result = await deleteStudentCertificate(selectedStudentCertificateDeleteId);
    if (result.success) {
      toast.success(result.message);
      setStudentCertificateRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  const RowOptions = ({ id }) => {
    return (
      <OptionsMenu
        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          {
            // to: `/apps/invoice/download/${row.id}`,
            text: 'Download',
            icon: <Icon icon="tabler:download" fontSize={20} />
          },
          {
            // to: `/apps/invoice/edit/${row.id}`,
            text: 'Edit',
            icon: <Icon icon="tabler:edit" />,
            menuItemProps: {
              onClick: () => {
                toggleEditUserDrawer();
              }
            }
          },
          {
            // to: `/apps/invoice/view/${row.id}`,
            text: 'View',
            icon: <Icon icon="tabler:eye" />,
            menuItemProps: {
              onClick: () => {
                handleView();
              }
            }
          },
          {
            // to: `/apps/invoice/delete/${row.id}`,
            text: 'Delete',
            icon: <Icon icon="mdi:delete-outline" />,
            menuItemProps: {
              onClick: () => handleDelete(id)
            }
          }
        ]}
      />
    );
  };

  const columns = [
    {
      flex: 0.5,
      headerName: 'Id',
      field: 'employee_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.id}
          </Typography>
        );
      }
    },
    {
      flex: 0.25,
      minWidth: 280,
      field: 'fullName',
      headerName: 'User',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.students?.first_name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row?.students?.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.name}
              </Typography>
              <Typography noWrap sx={{ color: 'text.secondary', mt: 0.8, fontSize: '14px' }}>
                {row?.description}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1,
      minWidth: 180,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <TextField
            size="small"
            select
            value={row?.is_active}
            label="status"
            id="custom-select"
            sx={{
              color: userStatusObj[row?.is_active]
            }}
            onChange={(e) => handleStatusValue(e, row)}
            SelectProps={{
              sx: {
                borderColor: row.is_active === '1' ? 'success' : 'error',
                color: userStatusObj[row?.is_active]
              }
            }}
          >
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
          </TextField>
        );
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];

  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StudentCertificateTableHeader
            selectedBranchId={selectedBranchId}
            value={value}
            // handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
          />
        </Grid>
        {loading ? (
          <ContentSkeleton />
        ) : (
          <Grid item xs={12}>
            <Card>
              <DataGrid
                autoHeight
                rowHeight={80}
                rows={studentCertificates}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowClick={handleRowClick}
              />
            </Card>
          </Grid>
        )}
        <StudentCertificateAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        <StudentCertificateEdit open={editUserOpen} toggle={toggleEditUserDrawer} initialValues={selectedRow} />

        <StudentCertificateDeleteModel
          open={studentCertificateDeleteModelOpen}
          setOpen={setStudentCertificateDeleteModelOpen}
          description="Are you sure you want to delete this studentCertificate?"
          title="Delete"
          handleSubmit={handleStudentCertificateDelete}
        />

        <StatusChangeDialog
          open={statusChangeDialogOpen}
          setOpen={setStatusChangeDialogOpen}
          description="Are you sure you want to Change Status"
          title="Change Status"
          handleSubmit={handleStatusChangeApi}
        />

        <StudentCertificateView certificate={selectedRow} open={isViewModalOpen} handleViewClose={handleViewClose} />
      </Grid>
    </>
  );
};

export default StudenrCertificate;
