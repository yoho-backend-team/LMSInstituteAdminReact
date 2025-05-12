import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import Icon from 'components/icon';
import { default as DeleteDialog, default as StatusDialog } from 'components/modal/DeleteModel';
import CustomTextField from 'components/mui/text-field';
import OptionsMenu from 'components/option-menu';
import HelpCenterAddDrawer from 'features/help-center/helpsupportAdd/components/HelpCenterAdded';
import HelpCenterEdit from 'features/help-center/helpsupportAdd/components/HelpCenterEdit';
import HlepCenterTableHeader from 'features/help-center/helpsupportAdd/components/HelpCenterTableHeader';
import {  selectHelpCenter, selectLoading } from 'features/help-center/helpsupportAdd/redux/HelpSelectors';
import { getAllHelpCenterDetails } from 'features/help-center/helpsupportAdd/redux/HelpThunks';
import { deleteHelpCenter,  updateHelpcenter } from 'features/help-center/helpsupportAdd/service/helpCenter';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';
import { useStudent } from 'utils/get-student-details';


const HelpDataGrid = () => {
  const [value, setValue] = useState('');
  const [addHelpUserOpen, setHelpAddUserOpen] = useState(false);
  const [editHelpUserOpen, setEditHelpUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedHelpCenter, setSelectedHelpCenter] = useState(null);
  const [selectedHelpCenterStatus, setSelectedHelpCenterStatus] = useState(null);
  const [isDeleteHelpDialogOpen, setDeleteHelpDialogOpen] = useState(false);
  const [deletingHelpItemId, setDeletingHelpItemId] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  

  const dispatch = useDispatch();
  const HelpCenterData = useSelector(selectHelpCenter);
  const HelpCenterLoading = useSelector(selectLoading);

  useEffect(() => {

    
    const data = {
      branchid: selectedBranchId,
      instituteid: useInstitute().getInstituteId(),
      page : 1,
      perPage :10
    };
   
    dispatch(getAllHelpCenterDetails(data));
    setLoading(false);
  }, [dispatch, selectedBranchId, refetch]);



const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  const handleStatusChange = (e, row) => {
    setSelectedHelpCenter(row);
    setSelectedHelpCenterStatus(e.target.value);
    setStatusDialogOpen(true);
  };


  

  const handleStatusChangeApi = async () => {
    const data = {
      is_active: selectedHelpCenterStatus,
      uuid: selectedHelpCenter?.uuid
    };
    const response = await updateHelpcenter(data); 
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleDeleteApi = async () => {
    const data = {
      id: deletingHelpItemId
    };
    const response = await deleteHelpCenter(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };
  const toggleAddUserDrawer = () => 
    setHelpAddUserOpen(!addHelpUserOpen);

  const handleHelpDelete = (itemId) => {
    setDeletingHelpItemId(itemId);
    setDeleteHelpDialogOpen(true);
  };

  const toggleHelpEditUserDrawer = () => {
    setEditHelpUserOpen(!editHelpUserOpen);
  };

  const columns = [
    {
      flex: 0.80,
      headerName: 'Q No',
      field: 'id',
      headerAlign: 'left',
      align:"left",
     
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize'}}>
            {row?.id}
          </Typography>
        );
      }
    },
    {
      flex: 1.1,
      field: 'category_name',
      headerName: 'Category Name',
      headerAlign: 'left',
      align:"left",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column',height:'100%'}}>
              
              <Typography
                noWrap
                sx={{
                  
                  
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  
                }}
              >
                {row?.category}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 2.0,
      field: 'videolink',
      headerName: 'Video Link',
      headerAlign: 'left',
      align:"left",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column',height:'100%'}}>
              
              <Typography
                noWrap
                sx={{
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  
                }}
              >
                {row?.videolink}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 2.2,
      field: 'Q&A',
      headerName: 'Q&A',
      headerAlign: "left",
      align:"left",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column',height:'100%'}}>
              
              <Typography
                noWrap
                sx={{
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  
                }}
              >
                {row?.question}
              </Typography>
              <Typography noWrap sx={{  color: 'text.secondary', mt: 1.3, fontSize: '13px' }}>
                {row?.answer}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ gap: 1 }}>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                // to: `/apps/invoice/edit/${row.id}`,
                text: 'Edit',
                icon: <Icon icon="tabler:edit" />,
                menuItemProps: {
                  onClick: () => {
                    toggleHelpEditUserDrawer();
                  }
                }
              },
              {
                // to: `/apps/invoice/delete/${row.id}`,
                text: 'Delete',
                icon: <Icon icon="mdi:delete-outline" />,
                menuItemProps: {
                  onClick: () => {
                    handleHelpDelete(row?.uuid);
                  }
                }
              }
            ]}
          />
        </Box>
      )
    }
  ];

  const handleFilter = useCallback(
    async (val) => {
      try {
        setValue(val);
        const result = await searchUsers(val);
        if (result.success) {
          dispatch(setUsers(result.data));
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <HlepCenterTableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
            selectedBranchId={selectedBranchId}
          />
        </Grid>
        {HelpCenterLoading ? (
          <ContentSkeleton />
        ) : (
          <Grid item xs={12}>
            <Card>
              <DataGrid
                autoHeight
                key={"id"}
                rowHeight={80}
                sx={{ textAlign:"left"}}
                 rows={HelpCenterData?.data}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
                onRowClick={handleRowClick}
              />
            </Card>
          </Grid>
        )}
        <HelpCenterAddDrawer open={addHelpUserOpen} toggle={toggleAddUserDrawer} setRefetch={setRefetch} />
        <HelpCenterEdit open={editHelpUserOpen} toggle={toggleHelpEditUserDrawer} initialValues={selectedRow} setRefetch={setRefetch} />
        <DeleteDialog
          open={isDeleteHelpDialogOpen}
          setOpen={setDeleteHelpDialogOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
          handleSubmit={handleDeleteApi}
        />
        <StatusDialog
          open={statusOpen}
          setOpen={setStatusDialogOpen}
          description="Are you sure you want to Change Status"
          title="Status"
          handleSubmit={handleStatusChangeApi}
        />
      </Grid>
      <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
      {HelpCenterData?.totalPages!== 1 && (
          <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
           <Pagination
              count={HelpCenterData?.totalPages}
              color="primary"
              onChange={(e, page) => {
                const data = {
                  branchid: selectedBranchId,
                  instituteid: useInstitute().getInstituteId(),
                  page: page 
                };
                (data,page)
                dispatch(getAllHelpCenterDetails(data));
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default HelpDataGrid;