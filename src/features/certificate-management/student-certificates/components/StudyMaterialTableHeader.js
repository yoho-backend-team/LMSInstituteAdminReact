// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
// ** Icon Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';

const StudyMaterialHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const batches = [
    { batch_id: '1', batch_name: 'Batch 1' },
    { batch_id: '2', batch_name: 'Batch 2' },
    { batch_id: '3', batch_name: 'Batch 3' },
  ];
  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' },
  ];
  const handleCourseChange = (newValue) => {
    if (newValue && newValue.some((option) => option.course_id === 'selectAll')) {
      setSelectedCourses(courses.filter((option) => option.course_id !== 'selectAll'));
    } else {
      setSelectedCourses(newValue);
    }
  };
  const handleBatchChange = (newValue) => {
    if (newValue && newValue.some((option) => option.batch_id === 'selectAll')) {
      setSelectedBatches(batches.filter((option) => option.batch_id !== 'selectAll'));
    } else {
      setSelectedBatches(newValue);
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Study materials" />
          <CardContent sx={{ pt: 0,pb:0 }}>
            <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={3}>
                  <Autocomplete
        multiple
        id="select-multiple-chip"
        options={batches}
        getOptionLabel={(option) => option.batch_name}
        value={selectedBatches}
        onChange={(event, newValue) => handleBatchChange(newValue)}
        renderInput={(params) => <TextField {...params} fullWidth label="Batches" />}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.batch_name}
          </li>
        )}
        renderTags={(value) =>
          value.map((option, index) => (
            <CustomChip
              key={option.batch_id}
              label={option.batch_name}
              onDelete={() => {
                const updatedValue = [...value];
                updatedValue.splice(index, 1);
                setSelectedBatches(updatedValue);
              }}
              color="primary"
              sx={{ m: 0.75 }}
            />
          ))
        }
        isOptionEqualToValue={(option, value) => option.batch_id === value.batch_id}
        selectAllText="Select All"
        SelectAllProps={{ sx: { fontWeight: 'bold' } }}
      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <Autocomplete
                  multiple
                  id="select-multiple-chip"
                  options={courses}
                  getOptionLabel={(option) => option.course_name}
                  value={selectedCourses}
                  onChange={(event, newValue) => handleCourseChange(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth label="Courses" />}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.course_name}
                    </li>
                  )}
                  renderTags={(value) =>
                    value.map((option, index) => (
                      <CustomChip
                        key={option.course_id}
                        label={option.course_name}
                        onDelete={() => {
                          const updatedValue = [...value];
                          updatedValue.splice(index, 1);
                          setSelectedCourses(updatedValue);
                        }}
                        color="primary"
                        sx={{ m: 0.75 }}
                      />
                    ))
                  }
                  isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                    <TextField
                      fullWidth
                      value={value}
                      label="Search Study Materials"
                      sx={{}}
                      placeholder="Search Study Materials"
                      onChange={(e) => handleFilter(e.target.value)}
                    />
                  </Grid>

                  <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
                      <Icon fontSize="1.125rem" icon="tabler:plus" />
                      Add Study Material
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudyMaterialHeader;
