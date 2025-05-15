// material-ui
import { Card, CardContent, Grid ,Box} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import CustomSkeleton from '..';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const GroupSkeleton = () => (
    <Grid container spacing={2} sx={{ marginTop: "20px"}} >
      {
        Array.from({length: 6}).map((_,index) => (
          <Grid item xs={4} key={index}>
          <Card
            sx={{
              borderRadius: "15px",
              boxShadow: 5,
              padding: "24px",
              position: 'relative',
              overflow: 'visible',
              background: '#fff',
              width: "388px",
              height: "185px"
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "16px",width: "340px", height: "32px"}}>
               <Box>
                 <CustomSkeleton variant='text' width={80} height={21} />
               </Box>
               <Box sx={{ display: "flex",gap:"-5px"}}>
                  <CustomSkeleton variant="circular" width={36} height={36} /> 
                  <CustomSkeleton variant="circular" width={36} height={36} />
                  <CustomSkeleton variant="circular" width={36} height={36} />
               </Box>
            </Box>
            <Box>
               <Box sx={{width: "340px", height: "26px"}}>
                  <CustomSkeleton variant="text" width={63} height={18} />
               </Box>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: "flex-end" ,mt: "30px", width: "340px", height: "37px"}}>
                <Box display="flex" alignItems="center" mb={1}>
                  <CustomSkeleton variant="text" width={100} height={38} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <CustomSkeleton width={4} height={4} borderRadius={2} />
                  <CustomSkeleton width={4} height={4} borderRadius={2} />
                  <CustomSkeleton width={4} height={4} borderRadius={2} />
                </Box>
               </Box>
            </Box>
          </Card>
        </Grid>
        ))
      }
    </Grid>
);

export default GroupSkeleton;
