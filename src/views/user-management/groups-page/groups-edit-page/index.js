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
  Icon,
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
import { getAllGroups } from 'features/user-management/groups-page/redux/groupThunks';
import { getAllPermissions, getPermissionsByRole, updateGroup } from 'features/user-management/groups-page/services/groupService';
import { editGroupYupSchema } from 'features/user-management/groups-page/utills';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';

const GroupEditDialog = () => {
  // State variables

  const dispatch = useDispatch();

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions,setRolePermissions] = useState([])
  const [permissionCount, setPermissionCount] = useState('');
  const [loading, setLoading] = useState(true);
  const {show,hide} = useSpinner()

  const location = useLocation();
  const navigate = useNavigate();
  const groupId = location?.state?.id;
  const groupName = location?.state?.name;

  // Default form values
  const defaultValues = {
    roleName: groupName
  };

  // Form methods using react-hook-form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(editGroupYupSchema)
  });

  // Function to handle form closure
  const handleClose = useCallback(() => {
    navigate(-1);
    reset();
  }, [reset]);

  const transformPermissions = (permissions) => {
    const result = {};
  
    permissions.forEach((permission) => {
      const [identity, action] = permission.split('-');
      
      if (!result[identity]) {
        result[identity] = {
          identity,
          create: false,
          read: false,
          update: false,
          delete: false
        };
      }
      console.log(result,"result")
      switch (action) {
        case 'create':
          result[identity].create = true;
          break;
        case 'read':
          result[identity].read = true;
          break;
        case 'update':
          result[identity].update = true;
          break;
        case 'delete':
          result[identity].delete = true;
          break;
      }
    });

    rolePermissions?.forEach((permission)=>{
      if (!result[permission?.identity]) {
        result[permission?.identity] = {
          identity:permission?.identity,
          create: false,
          read: false,
          update: false,
          delete: false
        };
      }
    })
  
    return Object.values(result);
  };

  // Function to handle form submission
  const onSubmit = useCallback(
    async (data) => {
      try {
        show()
        const PermissionList = transformPermissions(selectedCheckbox)
        console.log(PermissionList,"permissionList",data.roleName,groupName,groupId)
        
        const inputData = {
          id: groupId,
          identity: data.roleName,
          permissions: PermissionList,
          institute_id : useInstitute().getInstituteId()
        };

        const result = await updateGroup(inputData);
        
        if (result.success) {
          dispatch(getAllGroups({institute_id:useInstitute().getInstituteId(), branch_id: selectedBranchId }));
          navigate(-1);
          toast.success(result.message);
          hide()
        } else {
          // Handle the error response here
          hide()
          toast.error(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, selectedCheckbox, navigate, groupId, selectedBranchId]
  );
  // Fetch permissions and permission count on component mount
  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    getAllPermissionsIdByRole(groupId);
  }, [groupId]);

  // Fetch all permissions
  const getPermissions = useCallback(async () => {
    try {
      const result = await getAllPermissions();
      console.log(result,"common permissions")
      if (result.success) {
        setPermissions(result.data);
        setPermissionCount(result.permissions);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Fetch permissions by role id
  const getAllPermissionsIdByRole = useCallback(async (id) => {
    try {
      setLoading(true);
      const result = await getPermissionsByRole(id);
      console.log(result,"Role Permissions")
      if (result.success) {
        result.data?.forEach((permission) => {
          permission?.create_permission?.permission && togglePermission(permission?.identity+"-"+"create");
          permission?.read_permission?.permission && togglePermission(permission?.identity+"-"+"read");
          permission?.update_permission?.permission && togglePermission(permission?.identity + "-"+"update");
          permission?.delete_permission?.permission && togglePermission(permission?.identity +"-"+"delete");
        });
        setLoading(false);
        setRolePermissions(result?.data)
      } else {
        console.log(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  // Function to toggle permission selection
  const togglePermission = useCallback((id) => {
    setSelectedCheckbox((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((item) => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  }, []);

  // Function to handle select all checkbox
  const handleSelectAllCheckbox = useCallback(() => {
    console.log(permissions,isIndeterminateCheckbox)
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([]);
      setIsIndeterminateCheckbox(false);
    } else {
      const arr = [];
      permissions?.forEach((permission) => {
         permission?.permission?.map((i)=>
          arr.push(permission?.identity+"-"+i.name)
         )
      });
      console.log(arr,"add")
      setSelectedCheckbox(arr);
      setIsIndeterminateCheckbox(true);
    }
  }, [isIndeterminateCheckbox, permissionCount]);
  console.log(permissions,"permissions",selectedCheckbox,rolePermissions)

  // Render permissions table rows

  const renderPermissions = useMemo(() => {
    return permissions?.map((module,index) =>
      // module?.screens?.map((screen, index) => (
        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
          <TableCell
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontSize: (theme) => theme.typography.h6.fontSize
            }}
          >
            {module?.identity}
          </TableCell>
          {module?.permission?.map((permission, index) => (
          <>
            {
              <TableCell key={module?.id+module._id+index+module?.identity}>
              <FormControlLabel
                label={permission?.name}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={
                  <Checkbox
                    size="small"
                    id={`${index}-create`}
                    onChange={() => togglePermission(module?.identity+"-"+permission?.name)}
                    checked={selectedCheckbox?.includes(module?.identity+"-"+permission?.name)}
                    sx={{
                      '& svg': {
                        border: !selectedCheckbox?.includes(module?.identity+"-"+permission?.name)&&'1px solid #000', 
                        borderRadius: '4px',
                      }
                    }}
                  />
                }
              />
            </TableCell>
            }
            </>
          ))}
        </TableRow>
      // ))
    );
  }, [permissions, selectedCheckbox, togglePermission]);

  return (
    <>
      {loading ? (
        <AddGroupSkeleton />
      ) : (
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader
              sx={{
                textAlign: 'center',
                px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`],
                pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
              }}
              title="Edit Group"
              subheader="Set Group Permissions"
            ></CardHeader>
            <CardContent
              sx={{
                pb: (theme) => `${theme.spacing(5)} !important`,
                px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(5)} !important`]
              }}
            >
              <Box sx={{ my: 4 }}>
                <Controller
                  name="roleName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      label="Role Name"
                      onChange={onChange}
                      placeholder="John Doe"
                      error={Boolean(errors.roleName)}
                      {...(errors.roleName && { helperText: errors.roleName.message })}
                    />
                  )}
                />
              </Box>
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
                              checked={selectedCheckbox?.length === permissionCount?.length}
                              sx={{
                                '& svg': {
                                  border: '1px solid #000', 
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
                <Button sx={{ ml: 3 }} variant="tonal" color="error" onClick={handleClose}>
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

export default GroupEditDialog;
