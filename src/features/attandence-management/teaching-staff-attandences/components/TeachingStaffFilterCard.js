// ** React Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useEffect, useState } from 'react';
// ** Third Party Imports
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
// import { getAllTeachingStaffAttendances } from '../redux/teachingStaffAttendanceThunks';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';

/* eslint-enable */
const TeachingStaffFilterCard = (props) => {
  const { selectedBranchId } = props;

  const dispatch = useDispatch();

  // ** State
  const [statusValue, setStatusValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // const [selectedCourses, setSelectedCourses] = useState([]);
  // const [selectedstaff, setSelectedstaff] = useState([]);

  const courses = useSelector(selectCourses);

  // const staff = [
  //   { staff_id: '1', staff_name: 'Staff 1' },
  //   { staff_id: '2', staff_name: 'Staff 2' },
  //   { staff_id: '3', staff_name: 'Staff 3' }
  // ];

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
      // type: "teaching"
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId]);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId, type: 'teaching' };
    dispatch(getAllTeachingStaffs(data));
  };

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllTeachingStaffs({ search: searchInput, branch_id: selectedBranchId, type: 'teaching' }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Teaching Staff Attendance" />
            <CardContent>
              <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    multiple
                    fullWidth
                    options={courses}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      const courseId = newValue.map((item) => item.course_id);
                      const data = {
                        course_id: courseId,
                        branch_id: selectedBranchId,
                        type: 'teaching'
                      };
                      dispatch(getAllTeachingStaffs(data));
                    }}
                    // defaultValue={[top100Films[13]]}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.course_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Courses" placeholder="Favorites" />}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={3}>
                  <Autocomplete
                    multiple
                    id="select-multiple-chip"
                    options={[{ staff_id: 'selectAll', staff_name: 'Select All' }, ...staff]}
                    getOptionLabel={(option) => option.staff_name}
                    value={selectedstaff}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.staff_id === 'selectAll')) {
                        setSelectedstaff(staff.filter((option) => option.staff_id !== 'selectAll'));
                      } else {
                        setSelectedstaff(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Staffs"
                        InputProps={{
                          ...params.InputProps,
                          style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                        }}
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
                        {option.staff_name}
                      </li>
                    )}
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
                          <CustomChip
                            key={option.staff_id}
                            label={option.staff_name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              setSelectedstaff(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.staff_id === value.staff_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid> */}
                <Grid item xs={12} sm={4}>
                  <TextField value={searchValue} fullWidth placeholder="Search Batch" onChange={(e) => handleSearch(e)} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default TeachingStaffFilterCard;
