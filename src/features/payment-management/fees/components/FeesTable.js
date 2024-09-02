import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
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
import FeeDeleteModel from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import format from 'date-fns/format';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getInitials } from 'utils/get-initials';
import { selectLoading, selectStudentFees } from '../redux/studentFeeSelectors';
import { getAllStudentFees } from '../redux/studentFeeThunks';
import { deleteStudentFee } from '../services/studentFeeServices';
import FeesAddDrawer from './FeesAddDrawer';
import FeesCardHeader from './FeesCardHeader';
import FeesEditDrawer from './FeesEditDrawer';
import FeesViewDrawer from './FeesViewDrawer';
import jsPDF from 'jspdf';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';


// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}));

// ** renders client column
const renderClient = (row) => {
  if (row?.students?.image) {
    return (
      <Avatar src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.paid_amount}`} sx={{ mr: 2.5, width: 38, height: 38 }} />
    );
  } else {
    return (
      <Avatar
        skin="light"
        color={row?.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.student?.data?.data?.fullname || '')}
      </Avatar>
    );
  }
};

const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

const userStatusObj = {
  paid: 'success',
  pending: 'warning',
  refund: 'secondary'
};

const FeesTable = () => {
  // ** State
  const [dates, setDates] = useState([]);
  const [endDateRange, setEndDateRange] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const {show,hide} = useSpinner()

  function convertDateFormat(input) {
    var originalDate = new Date(input);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    var day = ('0' + originalDate.getDate()).slice(-2);
    var formattedDateString = year + '-' + month + '-' + day;
    return formattedDateString;
  }

  const dispatch = useDispatch();
  const StudentFees = useSelector(selectStudentFees);
  const StudentFeesLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    dispatch(
      getAllStudentFees({
        branch_id: selectedBranchId,
        page: '1'
      })
    );
  }, [dispatch, selectedBranchId, refetch]);

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
  };

  const handleRowClick = (rowData) => {
    setSelectedRows(rowData);
  };
  const handleDownload = (row) => {
    const doc = new jsPDF();
    doc.text(`Transaction ID: ${row.transaction_id}`, 10, 10);
    doc.text(`Student Name: ${row.student.full_name}`, 10, 20);
    doc.text(`Amount Paid: $${row.paid_amount || 0}`, 10, 30);
    doc.text(`Payment Date: ${row.payment_date}`, 10, 40);
    doc.save(`Transaction_${row.transaction_id}.pdf`);
  };
  

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
      const data = {
        start_date: convertDateFormat(start),
        end_date: convertDateFormat(end),
        branch_id: selectedBranchId
      };
      dispatch(getAllStudentFees(data));
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const [batches, setBatches] = useState([]);
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      institute_id : useInstitute().getInstituteId()
    };
    getBatches(data);
  }, [selectedBranchId]);

  const getBatches = async (data) => {
    const result = await getAllBatches(data);
    if (result?.success) {
      setBatches(result?.data);
    }
  };

  const [feeDeleteModelOpen, setFeeDeleteModelOpen] = useState(false);

  const [selectedFeeDeleteId, setSelectedFeeDeleteId] = useState(null);

  const handleDelete = useCallback((itemId) => {
    setSelectedFeeDeleteId(itemId);
    setFeeDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleFeeDelete = async () => {
    const result = await deleteStudentFee({ transaction_id: selectedFeeDeleteId });
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };
  const [feesViewOpen, setFeesViewUserOpen] = useState(false);
  const toggleFeesViewDrawer = () => {
    setFeesViewUserOpen(!feesViewOpen);
  };

  const defaultColumns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography component={LinkStyled} to={`/apps/invoice/preview/${row?.studentfee_id}`}>
          {`#${row?.id}`}
        </Typography>
      )
    },
    {
      flex: 1.25,
      minWidth: 140,
      field: 'transactionId',
      headerName: 'Transaction ID',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row?.transaction_id}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 210,
      field: 'name',
      headerName: 'Students',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {row?.student?.full_name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row?.student?.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1.25,
      minWidth: 120,
      field: 'total',
      headerName: 'Amount Paid',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary', ml: 2 }}>{`$${row.paid_amount || 0}`}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'issuedDate',
      headerName: 'Issued Date',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.payment_date}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        const isActive = row?.is_active;
        return (
          <CustomChip
            rounded
            skin="light"
            size="small"
            label={isActive ? 'Active' : 'Inactive'}
            color={isActive ? 'success' : 'error'}
            sx={{ textTransform: 'capitalize' }}
          />
        );
      }
    }
  ];

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 1 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'View',
                icon: <Icon icon="tabler:eye" />,
                menuItemProps: {
                  onClick: () => {
                    handleRowClick(row);
                    toggleFeesViewDrawer();
                  }
                }
              },
              {
                text: 'Edit',
                to: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon="tabler:edit" fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    handleRowClick(row);
                    toggleEditUserDrawer();
                  }
                }
              },
              {
                text: 'Delete',
                icon: <Icon icon="mdi:delete-outline" />,
                menuItemProps: {
                  onClick: () => {
                    handleDelete(row._id);
                    handleRowClick(row._id);
                  }
                }
              },
              {
                text: 'Download',
                icon: <Icon icon="tabler:download" fontSize={20} />,
                menuItemProps: {
                  onClick: () => handleDownload(row)
                }
              }
            ]}
          />
        </Box>
      )
    }
  ];

  return (
    <DatePickerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} >
            <CardHeader title="Fee" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    fullWidth
                    options={batches?.data}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      const selectedBatchId = newValue?.batch_id || '';
                      const data = {
                        batch_id: selectedBatchId,
                        branch_id: selectedBranchId
                      };
                      dispatch(getAllStudentFees(data));
                    }}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id="date-range-picker-months"
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label="Start date End date"
                        end={endDateRange}
                        start={startDateRange}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {/* Card Header */}
          <FeesCardHeader
            selectedBranchId={selectedBranchId}
            selectedRows={selectedRows}
            toggle={toggleAddUserDrawer}
            setRefetch={setRefetch}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            {StudentFeesLoading ? (
              <FeesTableSkeleton />
            ) : (
              <DataGrid
                sx={{ p: 2 }}
                autoHeight
                pagination
                style={{overflowX:"scroll"}}
                rowHeight={62}
                rows={StudentFees?.data}
                columns={columns}
                hideFooter
                disableRowSelectionOnClick
                hideFooterPagination
                onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
              />
            )}
            {StudentFees?.last_page !== 1 && (
              <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                  count={StudentFees?.last_page}
                  color="primary"
                  onChange={(e, page) => {
                    dispatch(getAllStudentFees({ branch_id: selectedBranchId, page: page }));
                  }}
                />
              </Grid>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Add Drawer */}
      <FeesAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} setRefetch={setRefetch} />

      {/* View */}
      <FeesViewDrawer open={feesViewOpen} toggle={toggleFeesViewDrawer} selectedRowDetails={selectedRows} />

      {/* Edit Drawer */}
      <FeesEditDrawer
        setRefetch={setRefetch}
        open={editUserOpen}
        toggle={toggleEditUserDrawer}
        selectedRows={selectedRows}
        handleRowClick={handleRowClick}
      />

      {/* Delte Modal */}
      <FeeDeleteModel
        open={feeDeleteModelOpen}
        setOpen={setFeeDeleteModelOpen}
        description="Are you sure you want to delete this studentFee?"
        title="Delete"
        handleSubmit={handleFeeDelete}
      />
    </DatePickerWrapper>
  );
};

export default FeesTable;
