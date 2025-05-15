import React from 'react';
import { TextField, MenuItem, InputAdornment } from '@mui/material';

const DurationInput = ({ value, onChange, error, helperText }) => {
  const [unit, setUnit] = React.useState('days');

  const handleChange = (e) => {
    if (e.target.name === 'duration') {
      onChange({ duration: e.target.value, unit });
    } else if (e.target.name === 'unit') {
      setUnit(e.target.value);
      onChange({ duration: value.duration, unit: e.target.value });
    }
  };
  
  return (
    <TextField
      fullWidth
      value={value.duration}
      onChange={handleChange}
      name='duration'
      label="Course Duration"
      type="number"
      placeholder="Enter the duration"
      error={Boolean(error)}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <TextField
              select
              name="unit"
              value={unit}
              onChange={handleChange}
              variant="standard"
              InputProps={{ disableUnderline: true }}
              size="small"
            >
              <MenuItem value="days">Days</MenuItem>
              <MenuItem value="weeks">Weeks</MenuItem>
              <MenuItem value="months">Months</MenuItem>
              <MenuItem value="years">Years</MenuItem>
            </TextField>
          </InputAdornment>
        ),
      }}
      inputProps={{ min: 1 }}
    />
  );
};

export default DurationInput;
