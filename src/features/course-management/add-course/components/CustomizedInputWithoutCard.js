import { TextField, Button, Grid } from '@mui/material';
import React, { useState } from 'react';

// ** MUI Imports
import Alert from '@mui/material/Alert';

const CustomizedInput = ({ placeholder, buttonTitle, data, setData }) => {
  const [value, setValue] = useState('');
  return (
    <Grid>
      {data?.length !== 0 && (
        <Grid>
          {data?.length !== 0 &&
            data.map((item, index) => (
              <Alert
                sx={{ mt: index === 0 ? 0 : 1 }}
                key={index}
                onClose={() => {
                  setData((prevData) => {
                    const newData = [...prevData];
                    newData.splice(index, 1);
                    return newData;
                  });
                }}
              >
                {item?.value}
              </Alert>
            ))}
        </Grid>
      )}
      <Grid>
        <Grid container>
          <Grid item xs={12}>
            <TextField value={value} fullWidth onChange={(e) => setValue(e.target.value)} placeholder={placeholder} sx={{ mt: 2 }} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="tonal"
              disabled={!value}
              fullWidth
              sx={{ height: 55, mt: 3 }}
              onClick={() => {
                setData([...data, { value: value }]);
                setValue('');
              }}
            >
              {buttonTitle}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomizedInput;
