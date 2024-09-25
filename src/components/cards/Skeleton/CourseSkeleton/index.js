import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomSkeleton from '..';

const CourseSkeleton = () => (
  <>
    <Grid container spacing={2} sx={{ marginLeft: "10px", marginTop: "20px"}} >
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid item xs={4} key={i}>
          <Card
            sx={{
              width: "388px",
              height: "430px",
              borderRadius: 3,
              boxShadow: 5,
              position: 'relative',
              overflow: 'visible',
              background: '#fff',
            }}
          >
            <Box
              sx={{
                p: "24px",
                borderTopLeftRadius: 'inherit',
                borderTopRightRadius: 'inherit',
                textAlign: 'left',
              }}
            >
                <CustomSkeleton variant='rectangular'  width={"100%"} height={169} borderRadius="5px" />
              <Box sx={{ marginTop: "5px"}}>
                 <CustomSkeleton variant="text" width={160} height={20} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <CustomSkeleton variant="text" width={100} height={38} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <CustomSkeleton width={4} height={4} borderRadius={2} />
                  <CustomSkeleton width={4} height={4} borderRadius={2} />
                  <CustomSkeleton width={4} height={4} borderRadius={2} />
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <CustomSkeleton variant="text" width={100} height={21} />
              </Box>
            </Box>

            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <CustomSkeleton variant="text" height={21} width={67} />
                <CustomSkeleton variant="text" height={38} width={114} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
);

export default CourseSkeleton;
