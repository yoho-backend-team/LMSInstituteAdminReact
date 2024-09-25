import React from 'react';
import { Card, CardContent, Box, Grid } from '@mui/material';
import CustomWaveSkeleton from '../BranchMainSkeleton/customSkelton';

const StudyMaterialSkelton = () => {
  return (
    <Grid container spacing={2} sx={{ marginLeft: "10px", marginTop: "20px"}} >
      {Array.from({ length: 10 }).map((_, i) => (
        <Grid item xs={4} key={i}>
          <Card
            sx={{
              maxWidth: 345,
              borderRadius: 3,
              boxShadow: 5,
              position: 'relative',
              overflow: 'visible',
              background: '#fff',
            }}
          >
            <Box
              sx={{
                p: 2,
                borderTopLeftRadius: 'inherit',
                borderTopRightRadius: 'inherit',
                textAlign: 'left',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <CustomWaveSkeleton variant="text" width={100} height={38} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <CustomWaveSkeleton width={4} height={4} borderRadius={2} />
                  <CustomWaveSkeleton width={4} height={4} borderRadius={2} />
                  <CustomWaveSkeleton width={4} height={4} borderRadius={2} />
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <CustomWaveSkeleton variant="text" width={100} height={21} />
              </Box>
            </Box>

            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <CustomWaveSkeleton variant="text" height={21} width={67} />
                <CustomWaveSkeleton variant="text" height={38} width={114} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StudyMaterialSkelton;
