import { Card, CardContent, Grid, Box  } from '@mui/material';
import CustomSkeleton from '..';


const CategorySkeleton = () => (
      
        <Grid container spacing={2} sx={{ marginLeft: "10px", marginTop: "20px"}} >
        {Array.from({ length: 10 }).map((_, i) => (
          <Grid item xs={4} key={i}>
            <Card
              sx={{
                width: "388px",
                height: "300px",
                borderRadius: "15px",
                // boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)",
                position: 'relative',
                overflow: 'visible',
                background: '#fff',
              }}
            >
              <Box
                sx={{
                  borderTopLeftRadius: '15px',
                  borderTopRightRadius: '15px',
                }}
              >
                <Box>
                  <CustomSkeleton variant="rectangular" height={150} width={"100%"} />
                </Box>
              </Box>
  
              <CardContent sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column",gap: "30px"}} >
              <Box display="flex" alignItems="center" mb={1}>
                  <CustomSkeleton variant="text" width={125} height={28} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <CustomSkeleton variant="text" width={142} height={38} />
                  </Box>
  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <CustomSkeleton width={4} height={4} borderRadius={2} />
                    <CustomSkeleton width={4} height={4} borderRadius={2} />
                    <CustomSkeleton width={4} height={4} borderRadius={2} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
);

export default CategorySkeleton;
