import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import AddGroupSkeleton from 'components/cards/Skeleton/AddGroupSkeleton';
import Icon from 'components/icon';
import { selectGroups } from 'features/user-management/groups-page/redux/groupSelectors';
import { getAllGroups } from 'features/user-management/groups-page/redux/groupThunks';
import { addGroup, getAllPermissions } from 'features/user-management/groups-page/services/groupService';
import { addGroupYupSchema } from 'features/user-management/groups-page/utills';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSpinner } from 'context/spinnerContext';
import { useInstitute } from 'utils/get-institute-details';

const GroupAddPage = () => {
  // State variables
  const dispatch = useDispatch();

  const groups = useSelector(selectGroups);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [loading, setLoading] = useState(true);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [SelectedPermissions,setSelectedPermissions] = useState([])
  const {show,hide} = useSpinner()

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGroups({ branch_id: selectedBranchId ,institute_id:useInstitute().getInstituteId()}))
  }, [dispatch, selectedBranchId]);
  
  // Fetch permissions on component mount
  useEffect(() => {
    getPermissions();
  }, []);

  // Default form values
  const defaultValues = {
    groupName: '',
    branch: []
  };

  // Form methods using react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(addGroupYupSchema)
  });
  
  // Function to handle form submission
  const onSubmit = useCallback(
    async (data) => {
      
      show()
      try {
        const inputData = {
          identity: data.groupName,
          permissions: SelectedPermissions,
          institute_id : useInstitute().getInstituteId()
        };

        // Check if the group name already exists
        // const existingGroup = groups.find((group) => group.name === data.groupName);
        // if (existingGroup) {
        //   toast.error('Group already exists');
        //   return; // Exit the function if group already exists
        // }

        const result = await addGroup(inputData);

        if (result.success) {
          // Update groups after adding a new group
          dispatch(getAllGroups({ institute_id:useInstitute().getInstituteId(),branch_id: selectedBranchId }));
          navigate(-1);
          toast.success(result.message);
          hide()
        } else {
          hide()
          toast.error(result.message);
        }
      } catch (error) {
        console.log(error);
        hide()
        toast.error('Group Name Already Exists');
      }
    },
    [dispatch, selectedCheckbox, navigate, groups, selectedBranchId]
  );

  // Function to toggle permission selection
  const togglePermission = useCallback((id) => {
    setSelectedCheckbox((prevSelectedCheckbox) => {
      if (prevSelectedCheckbox.includes(id)) {
        return prevSelectedCheckbox.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelectedCheckbox, id];
      }
    });
  }, []);

  // Function to handle select all checkbox
  const handleSelectAllCheckbox = useCallback(() => {
    
    if (isIndeterminateCheckbox) {
      setSelectedPermissions([])
      setSelectedCheckbox([]);
      setIsIndeterminateCheckbox(false);
    } else {
      const permissionList = permissions?.map(module => ({
        id: module.id,
        identity: module.identity,
        permission: module.permission.map(perm => ({
          [perm.name]: perm.is_active,
          _id: perm._id
        }))
      }));
      setSelectedPermissions(permissionList)
      const allPermissionsIds = permissions.flatMap((module) => module.permission.map((permission) => permission._id))
      setSelectedCheckbox(allPermissionsIds);
      setIsIndeterminateCheckbox(true);
    }
  }, [isIndeterminateCheckbox, permissions]);

  // Fetch permissions from API
  const getPermissions = useCallback(async () => {
    try {
      setLoading(true);
      show()
      const result = await getAllPermissions();
      if (result.success) {
        setPermissions(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while fetching permissions');
    } finally {
      hide()
      setLoading(false);
    }
  }, []);

  const handleSelectPermissions = (module, permission, index, e) => {
    setSelectedPermissions((prevData) => {
      
      const moduleIndex = prevData.findIndex((item) => item.id === module.id);
      
      if (moduleIndex !== -1) {
       
        return prevData.map((item, idx) => {
          if (idx === moduleIndex) {
           
            const updatedPermissions = item.permission.map((perm) => {
              if (perm._id === permission._id) {
                return { ...perm, [permission.name]: e.target.checked };
              }
              return perm;
            });
  
            if (!updatedPermissions.find((perm) => perm._id === permission._id)) {
              updatedPermissions.push({ [permission.name]: e.target.checked, _id: permission._id });
            }
  
            return { ...item, permission: updatedPermissions };
          }
          return item;
        });
      } else {
       
        return [
          ...prevData,
          {
            id: module.id,
            identity: module.identity,
            permission: [{ [permission.name]: e.target.checked, _id: permission._id }],
          },
        ];
      }
    });
  };
  

  // Render permissions table rows
  const renderPermissions = useMemo(() => {
    return permissions.map((module) =>
      <TableRow key={module?.id} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' }, '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        transition: 'background-color 0.2s ease'
      },
      borderLeft: '4px solid transparent',
      '&:hover': {
        backgroundColor: 'ghostwhite'
      } }}>
          <TableCell
            sx={{
              fontWeight: 500,
              whiteSpace: 'nowrap', 
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5, 
              m:2 
            }}
          >
            {module?.identity}
          </TableCell>
          <TableCell sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {module?.permission?.map((permission, index) => (
            <TableCell key={index} 
            elevation={0}
            sx={{
              p: 1,
              borderRadius: '8px',
              backgroundColor: selectedCheckbox.includes(permission._id) 
                ? 'rgba(25, 118, 210, 0.08)'
                : ' ',
               
              
            }}
            >
              <FormControlLabel
                label={permission.name}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={
                  <Checkbox
                    size="small"
                    id={permission?._id}
                    onChange={(e) => {togglePermission(permission._id),handleSelectPermissions(module,permission,index,e)}}
                    checked={selectedCheckbox.includes(permission._id)}
                    sx={{
                      '& svg': {
                        border: !selectedCheckbox.includes(permission._id) && '1px solid #000', 
                        borderRadius: '4px',
                      }
                    }}
                  />
                }
              />
            </TableCell>
          ))}
           </TableCell>
        </TableRow>
    );
  }, [permissions, selectedCheckbox, togglePermission]);

  return (
    <>
      {loading ? (
        <AddGroupSkeleton />
      ) : (
        <Card scroll="body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader
              sx={{
                textAlign: 'center',
                px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`],
                pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
              }}
              title="Add New Group"
              subheader="Set Group Permissions"
            ></CardHeader>
            <CardContent
              sx={{
                pb: (theme) => `${theme.spacing(5)} !important`,
                px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(5)} !important`]
              }}
            >
              <Grid sx={{ m: 4,justifyContent: 'center', gap: 2 }} container>
                <Grid item xs={12} sm={5.9}>
                  <Controller
                    name="groupName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        value={value}
                        label="Group Name"
                        onChange={onChange}
                        placeholder="John Doe"
                        error={Boolean(errors.groupName)}
                        {...(errors.groupName && { helperText: errors.groupName.message })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Typography variant="h4">Group Permissions</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: '0 !important' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            whiteSpace: 'nowrap',
                            alignItems: 'center',
                            textTransform: 'capitalize',
                            '& svg': { ml: 1, cursor: 'pointer' },
                            color: (theme) => theme.palette.text.secondary,
                            fontSize: (theme) => theme.typography.h6.fontSize
                          }}
                        >
                          Administrator Access
                          <Tooltip placement="top" title="Allows a full access to the system">
                            <Box sx={{ display: 'flex' }}>
                              <Icon icon="tabler:info-circle" fontSize="1.25rem" />
                            </Box>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell colSpan={3}>
                        <FormControlLabel
                          label="Select All"
                          sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size="small"
                              onChange={handleSelectAllCheckbox}
                              indeterminate={isIndeterminateCheckbox}
                              checked={selectedCheckbox.length === permissions.length}
                              sx={{
                                '& svg': {
                                  border: !isIndeterminateCheckbox && '1px solid #000', 
                                  borderRadius: '4px',
                                }
                              }}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{renderPermissions}</TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'center',
                px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(8)} !important`],
                pb: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
              }}
            >
              <Box className="demo-space-x">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button variant="tonal" sx={{ ml: 5 }} color="error" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Box>
            </CardActions>
          </form>
        </Card>
      )}
    </>
  );
};

export default GroupAddPage;
