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
import { useInstitute } from 'utils/get-institute-details';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  const handleRowClick = useCallback((params) => {
    setSelectedRow(params);
  }, []);

  const renderClient = (row) => {
    if (row?.students?.image) {
      return (
        <CustomAvatar
          src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.student?.image}`}
          sx={{ mr: 2.5, width: 38, height: 38 }}
        />
      );
    } else {
      return (
        <CustomAvatar
          skin="light"
          sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
        >
          {getInitials(row?.student?.fullname ||  '')}
        </CustomAvatar>
      );
    }
  };
  const downloadPDF = (row) => {
  const doc = new jsPDF();
  const marginLeft = 10;
  const marginTop = 10;
  const lineHeight = 10;

  // Set document properties
  doc.setProperties({
    title: 'Student Certificate',
  });

  // Add title
  doc.setFontSize(16);
  doc.text('Student Certificate', marginLeft, marginTop);

  // Add details
  doc.setFontSize(12);
  doc.text(`Certificate Name: ${row.certificate_name}`, marginLeft, marginTop + lineHeight * 2);
  doc.text(`Description: ${row.description}`, marginLeft, marginTop + lineHeight * 3);
  doc.text(`Student Name: ${row.student[0].full_name}`, marginLeft, marginTop + lineHeight * 4);
  doc.text(`Student Email: ${row.student[0].email}`, marginLeft, marginTop + lineHeight * 5);
  doc.text(`Status: ${row.is_active ? 'Active' : 'Inactive'}`, marginLeft, marginTop + lineHeight * 6);

  // Add table with autoTable
  autoTable(doc, {
    startY: marginTop + lineHeight * 8,
    head: [['Field', 'Value']],
    body: [
      ['Certificate Name', row.certificate_name],
      ['Description', row.description],
      ['Student Name', row.student[0].full_name],
      ['Student Email', row.student[0].email],
      ['Status', row.is_active ? 'Active' : 'Inactive'],
    ],
    styles: { fontSize: 12 },
    headStyles: { fillColor: [22, 160, 133] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() - marginLeft - 10, doc.internal.pageSize.getHeight() - 10);
  }

  // Save PDF
  doc.save('student_certificate.pdf');
};
 
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleStatusChangeApi = async () => {
    if (!selectedRow?.uuid) {
      console.error('UUID is undefined');
      return;
    }
  
    const data = {
      is_active: statusValue?.is_active === true ? false : true
    };
    const response = await updateStudentCertificateStatus(selectedRow.uuid, data);

    if (response.success) {
      toast.success(response.message);
      setStudentCertificateRefetch((state) => !state);
 
    } else {
      toast.error(response.message);
    }
  };
  
  
    const handleStatusValue = (event, users) => {
    setSelectedRow(users)
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
  };

  const dispatch = useDispatch();
  const studentCertificates = useSelector(selectStudentCertificates);
  const studentCertificatesLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    const data = {
      branchid: selectedBranchId,
      InstituteId: useInstitute().getInstituteId(),
      page: '1'
    };
    dispatch(getAllStudentCertificates(data));
  }, [dispatch, selectedBranchId, studentCertificateRefetch]);

  const handleDelete = useCallback((certificateid) => {
    setSelectedStudentCertificateDeleteId(certificateid);
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
            icon: <Icon icon="tabler:download" fontSize={20} />,
            menuItemProps: {
              onClick: () => downloadPDF(row)
            }
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
                handleDelete(row.uuid);
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
                {row?.student[0]?.full_name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row?.student[0]?.email}
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
                {row?.certificate_name}
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
                borderColor: row.is_active? 'success' : 'error',
                color: userStatusObj[row?.is_active]
              }
            }}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
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

  console.log(selectedRow,"selectedRow")
  

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
                rows={studentCertificates?studentCertificates :[]}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
                onRowClick={(params) => handleRowClick(params.row)}
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
          certificateid={selectedRow?.uuid}
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