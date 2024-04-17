import { useCallback, useState } from 'react';

import { CardContent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import Icon from 'components/icon';
import { default as StatusChangeDialog, default as StudentCertificateDeleteModel } from 'components/modal/DeleteModel';
import CustomAvatar from 'components/mui/avatar';
import OptionsMenu from 'components/option-menu';
import StudentCertificateAddDrawer from 'features/certificate-management/student-certificates/components/StudentCertificateAddDrawer';
import StudentCertificateEdit from 'features/certificate-management/student-certificates/components/StudentCertificateEdit';
import StudentCertificateTableHeader from 'features/certificate-management/student-certificates/components/StudentCertificateTableHeader';
import StudentCertificateView from 'features/certificate-management/student-certificates/components/StudentCertificateView';
import {
  selectLoading,
  selectStudentCertificates
} from 'features/certificate-management/student-certificates/redux/studentCertificateSelectors';
import { getAllStudentCertificates } from 'features/certificate-management/student-certificates/redux/studentCertificateThunks';
import {
  deleteStudentCertificate,
  updateStudentCertificateStatus
} from 'features/certificate-management/student-certificates/services/studentCertificateServices';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getInitials } from 'utils/get-initials';

const userStatusObj = {
  1: 'success',
  0: 'error'
};

const StudenrCertificate = () => {
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
    if (row?.students?.image) {
      return (
        <CustomAvatar
          src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.students?.image}`}
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
    setSelectedRow(params);
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
      setStudentCertificateRefetch();
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
    setStudentCertificateRefetch();
    console.log('Toggle drawer');
  };

  const dispatch = useDispatch();
  const studentCertificates = useSelector(selectStudentCertificates);
  const studentCertificatesLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      page: '1'
    };
    dispatch(getAllStudentCertificates(data));
  }, [dispatch, selectedBranchId, studentCertificateRefetch]);

  const handleDelete = useCallback((itemId) => {
    setSelectedStudentCertificateDeleteId(itemId);
    setStudentCertificateDeleteModelOpen(true);
  }, []);

  const handleStudentCertificateDelete = async () => {
    const result = await deleteStudentCertificate(selectedStudentCertificateDeleteId);
    if (result.success) {
      toast.success(result.message);
      setStudentCertificateRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  const RowOptions = ({ row }) => {
    return (
      <OptionsMenu
        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          {
            text: 'Download',
            icon: <Icon icon="tabler:download" fontSize={20} />
          },
          {
            text: 'Edit',
            icon: <Icon icon="tabler:edit" />,
            menuItemProps: {
              onClick: () => {
                toggleEditUserDrawer();
                handleRowClick(row);
              }
            }
          },
          {
            text: 'View',
            icon: <Icon icon="tabler:eye" />,
            menuItemProps: {
              onClick: () => {
                handleView();
                handleRowClick(row);
              }
            }
          },
          {
            text: 'Delete',
            icon: <Icon icon="mdi:delete-outline" />,
            menuItemProps: {
              onClick: () => {
                handleDelete(row.id);
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
      renderCell: ({ row }) => <RowOptions row={row} />
    }
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StudentCertificateTableHeader selectedBranchId={selectedBranchId} toggle={toggleAddUserDrawer} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            {studentCertificatesLoading ? (
              <ContentSkeleton />
            ) : (
              <DataGrid
                autoHeight
                rowHeight={80}
                rows={studentCertificates?.data}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
              />
            )}
            <CardContent>
              {studentCertificates?.last_page !== 1 && (
                <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    count={studentCertificates?.last_page}
                    color="primary"
                    onChange={(e, page) => {
                      dispatch(getAllStudentCertificates({ branch_id: selectedBranchId, page: page }));
                    }}
                  />
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Add Drawer */}
        <StudentCertificateAddDrawer
          open={addUserOpen}
          toggle={toggleAddUserDrawer}
          setStudentCertificateRefetch={setStudentCertificateRefetch}
        />

        {/* Edit */}
        <StudentCertificateEdit
          open={editUserOpen}
          initialValues={selectedRow}
          toggle={toggleEditUserDrawer}
          setStudentCertificateRefetch={setStudentCertificateRefetch}
        />
        {/* Delete */}
        <StudentCertificateDeleteModel
          open={studentCertificateDeleteModelOpen}
          setOpen={setStudentCertificateDeleteModelOpen}
          description="Are you sure you want to delete this studentCertificate?"
          title="Delete"
          handleSubmit={handleStudentCertificateDelete}
        />
        {/* Status Change */}
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
