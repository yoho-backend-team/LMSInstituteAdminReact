import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import FeesTableSkeleton from 'components/cards/Skeleton/PaymentSkeleton';
import Icon from 'components/icon';
import RefundDeleteModel from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { selectLoading, selectStudentFeeRefunds } from '../redux/studentFeeRefundSelectors';
import { getAllStudentFeeRefunds } from '../redux/studentFeeRefundThunks';
import { deleteStudentFeeRefund } from '../services/studentFeeRefundServices';
import RefundAddDrawer from './RefundAddDrawer';
import RefundCardHeader from './RefundCardHeader';
import RefundViewDrawer from './RefundViewDrawer';

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}));

const defaultColumns = [
  {
    minWidth: 180,
    field: 'refundId',
    headerName: 'Refund ID',
    renderCell: ({ row }) => (
      <Typography component={LinkStyled} to={`#` }>
        {`#${row?.studentfees?.transaction_id}`}
      </Typography>
    )
  },
  {
    minWidth: 180,
    field: 'studentId',
    headerName: 'Student ID',
    renderCell: ({ row }) => (
      <Typography component={LinkStyled} to={`#`}>
        {`#${row?.student?.id}`}
      </Typography>
    )
  },
  {
    minWidth: 200,
    field: 'studentInfo',
    headerName: 'Student Info',
    renderCell: ({ row }) => {
      // const { students } = row?.studentfees;
      const studentName = `${row?.student.first_name} ${row?.student.last_name}`;
      const studentEmail = row?.student?.email;

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {studentName}
          </Typography>
          <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
            {studentEmail}
          </Typography>
        </Box>
      );
    }
  },
  {
    minWidth: 120,
    field: 'paidAmount',
    headerName: 'Paid Amount',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row?.studentfees?.paid_amount}</Typography>
  },
  {
    minWidth: 150,
    field: 'paymentDate',
    headerName: 'Payment Date',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row?.studentfees?.payment_date}</Typography>
  },
  {
    minWidth: 150,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => (
      <>
        <CustomChip
          rounded
          size="medium"
          skin="light"
          color={row.status === 'success' ? 'success' : 'error'} // Dynamically set chip color based on status
          label={row?.studentfees?.is_active?'Active' : 'Inactive'}
        />
      </>
    )
  }
];

const RefundTable = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState([]);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();
  const studentFeeRefunds = useSelector(selectStudentFeeRefunds);
  const StudentFeeRefundsLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    dispatch(
      getAllStudentFeeRefunds({
        branch_id: selectedBranchId,
        page: '1'
      })
    );
  }, [dispatch, selectedBranchId, refetch]);

  const [refundViewOpen, setRefundViewUserOpen] = useState(false);

  const [selectedRowDetails, setSelectedRowDetails] = useState(null);

  const handleRowClick = (rowData) => {
    setSelectedRowDetails(rowData);
  };

  const toggleRefundViewDrawer = () => {
    setRefundViewUserOpen(!refundViewOpen);
  };

  const [refundDeleteModelOpen, setRefundDeleteModelOpen] = useState(false);

  const [selectedRefundDeleteId, setSelectedRefundDeleteId] = useState(null);

  const handleDelete = useCallback((itemId) => {
    setSelectedRefundDeleteId(itemId);
    setRefundDeleteModelOpen(true);
  }, []);

  const handleRefundDelete = async () => {
    const data = { transaction_id: selectedRefundDeleteId };
    const result = await deleteStudentFeeRefund(data);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  const columns = [
    ...defaultColumns,
    {
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'View',
                icon: <Icon icon="tabler:eye" />,
                menuItemProps: { onClick: toggleRefundViewDrawer }
              },
              {
                text: 'Delete',
                icon: <Icon icon="tabler:trash" />,
                menuItemProps: {
                  onClick: () => {
                    handleDelete(row._id);
                  }
                }
              }
            ]}
          />
        </Box>
      )
    }
  ];

  const [batches, setBatches] = useState([]);
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getBatches(data);
  }, [selectedBranchId]);

  const getBatches = async (data) => {
    const result = await getAllBatches(data);
    if (result?.success) {
      setBatches(result?.data);
    }
  };
  
  return (
    <DatePickerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ display: "none"}} >
            <CardHeader title="Filters" />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    sx={{ display: "none"}}
                    fullWidth
                    options={batches?.data}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      let data = { branch_id: selectedBranchId };
                      if (newValue) {
                        data = {
                          batch_id: newValue.batch_id,
                          branch_id: selectedBranchId
                        };
                      }
                      dispatch(getAllStudentFeeRefunds(data));
                    }}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label="Batches" placeholder="Favorites" />}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <RefundCardHeader selectedBranchId={selectedBranchId} selectedRows={selectedRows} toggle={toggleAddUserDrawer} />
        </Grid>
        <Grid item xs={12}>
          {StudentFeeRefundsLoading ? (
            <FeesTableSkeleton />
          ) : (
            <Card>
              <DataGrid
                sx={{ 
                  '& .MuiDataGrid-row' : {
                    border: "1px solid #e6e5e7",
                    borderLeft: "none",
                    borderRight: "none",
                  },
                  "& .MuiDataGrid-row" : {
                    border : "1px solid #e6e5e7",
                    borderLeft: "none",
                    borderRight: "none",
                    ":hover" : {
                       backgroundColor : "#f5f5f7",
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                    }
                  },
                  "& .MuiDataGrid-columnHeaders" : {
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                  },
                  "& .MuiDataGrid-footerContainer" : {
                    border : "1px solid #e6e5e7"
                }
                 }}
                autoHeight
                getRowHeight={() => 'auto'}
                rows={studentFeeRefunds?studentFeeRefunds:[]}
                columns={columns}
                disableRowSelectionOnClick
                onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
                onRowClick={(params) => handleRowClick(params.row)}
                hideFooterPagination
                disableColumnMenu={true}
                disableColumnFilter={true}
              />
            </Card>
          )}
          {/* {studentFeeRefunds?.last_page !== 1 && (
            <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Pagination
                count={studentFeeRefunds?.last_page}
                color="primary"
                onChange={(e, page) => {
                  dispatch(getAllStudentFeeRefunds({ branch_id: selectedBranchId, page: page }));
                }}
              />
            </Grid>
          )} */}
          <RefundAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} setRefetch={setRefetch} />

          <RefundViewDrawer open={refundViewOpen} toggle={toggleRefundViewDrawer} selectedRowDetails={selectedRowDetails} />

          <RefundDeleteModel
            open={refundDeleteModelOpen}
            setOpen={setRefundDeleteModelOpen}
            description="Are you sure you want to delete this item?"
            title="Delete"
            handleSubmit={handleRefundDelete}
          />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default RefundTable;
