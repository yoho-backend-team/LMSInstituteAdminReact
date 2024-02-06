// ** React Components
import React, { useEffect } from 'react';

// ** Mui Components
import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
import Autocomplete from '@mui/material/Autocomplete';
import CustomChip from 'components/mui/chip';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
// ** Custom Components
import Icon from 'components/icon';

// ** Toast Import
import toast from 'react-hot-toast';

// ** Api Services Import
import { addGroup, getAllPermissions } from 'features/user-management/groups/services/groupService';
import { useSelector } from 'react-redux';
import AddGroupSkeleton from 'components/cards/Skeleton/AddGroupSkeleton';
import { useState } from 'react';


const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};
const schema = yup.object().shape({
  groupName: yup
    .string()
    .min(3, (obj) => showErrors('Group Name', obj.value.length, obj.min))
    .required(),
  branch: yup.array().min(1, 'Select at least one Branch').required()
});

const defaultValues = {
  groupName: '',
  branch: []
};

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};


const GroupAddPage = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    setValue('groupName', '');
    setValue('branch', '');
    reset();
  };

  // ** States
  // const [groupName, setGroupName] = React.useState('');
  const [selectedCheckbox, setSelectedCheckbox] = React.useState([]);
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = React.useState(false);
  const [permissions, setPermissions] = React.useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const navigate = useNavigate();
  // const [personNameNative, setPersonNameNative] = useState([]);

  const onSubmit = async (data) => {
    try {
      const inputData = {
        branch_id: selectedBranchId,
        name: data.groupName,
        permissions: selectedCheckbox
      };
      const result = await addGroup(inputData);

      if (result.success) {
        navigate(-1);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ** useEffects
  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < permissions.length * 8) {
      setIsIndeterminateCheckbox(true);
    } else {
      setIsIndeterminateCheckbox(false);
    }
  }, [selectedCheckbox, permissions]);

  useEffect(() => {
    getPermissions();
  }, []);

  // ** Method for AddNewGroup
  // const handleAddGroup = async () => {
  //   try {
  //     const result = await addGroup(groupName, selectedCheckbox);

  //     if (result.success) {
  //       toast.success(result.message);
  //     } else {
  //       toast.error(result.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // ** Method for SelectAllPermissions
  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([]);
    } else {
      permissions.forEach((screens) => {
        screens?.screens?.forEach((permissions) => {
          permissions?.permissions?.forEach((permission) => {
            togglePermission(permission.id);
          });
        });
      });
    }
  };

  // ** Method for Manage Permission selection
  const togglePermission = (id) => {
    const arr = selectedCheckbox;
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1);
      setSelectedCheckbox([...arr]);
    } else {
      arr.push(id);
      setSelectedCheckbox([...arr]);
    }
  };

  // ** Method for GetAllPermissions
  const getPermissions = async () => {
    try {
      const result = await getAllPermissions();
      if (result.success) {
        setPermissions(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ** Method for RenderPermissions
  const renderPermissions = () => {
    return permissions.map((module) =>
      module.screens.map((screen, index) => (
        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
          <TableCell
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontSize: (theme) => theme.typography.h6.fontSize
            }}
          >
            {screen.screen_name}
          </TableCell>
          {screen.permissions.map((permission, index) => (
            <TableCell key={index}>
              <FormControlLabel
                label={permission.name}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={
                  <Checkbox
                    size="small"
                    id={`${index}-write`}
                    onChange={() => togglePermission(permission.id)}
                    checked={selectedCheckbox.includes(permission.id)}
                  />
                }
              />
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  };

  const groups = [
    { id: '1', name: 'Offline Class' },
    { id: '2', name: 'Online class' },
    { id: '3', name: 'Hybrid' }
  ];
  return (
    <>
    {loading ? (
        <AddGroupSkeleton />
      ) : (
    <Card fullWidth maxWidth="md" scroll="body">
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
          <Grid sx={{ my: 4, gap: 2 }} container>
            <Grid xs={12} sm={5.9}>
              <Controller
                name="groupName"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    // sx={{ mb: 4 }}
                    label="Group Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.groupName)}
                    {...(errors.groupName && { helperText: errors.groupName.message })}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={5.9}>
              <Controller
                name="branch"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    multiple
                    id="select-multiple-chip"
                    options={groups}
                    getOptionLabel={(option) => option.name}
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.id === 'selectAll')) {
                        onChange(groups.filter((option) => option.id !== 'selectAll'));
                      } else {
                        onChange(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Branch"
                        error={Boolean(errors.branch)}
                        {...(errors.branch && { helperText: errors.branch.message })}
                      />
                    )}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    renderTags={(value) =>
                      value.map((option, index) => (
                        <CustomChip
                          key={option.id}
                          label={option.name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            onChange(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
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
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderPermissions()}</TableBody>
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
            <Button variant="tonal" sx={{ml:5}} color="error" onClick={handleClose}>
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
