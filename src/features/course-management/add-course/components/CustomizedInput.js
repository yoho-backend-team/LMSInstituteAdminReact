import { Card, CardHeader, CardContent, CardActions, TextField, Button, Grid } from '@mui/material';
import React, { useState } from 'react';

// ** MUI Imports
import Alert from '@mui/material/Alert';

const CustomizedInput = ({ placeholder, cardTitle, buttonTitle, data, setData }) => {
  const [value, setValue] = useState('');
  return (
    <Card>
      <CardHeader title={cardTitle}></CardHeader>
      {data?.length !== 0 && (
        <CardContent>
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
        </CardContent>
      )}
      <CardActions>
        <Grid container>
          <Grid item xs={12}>
            <TextField value={value} fullWidth onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
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
      </CardActions>
    </Card>
  );
};

export default CustomizedInput;
