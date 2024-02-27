// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

// ** Custom Components Imports
import CustomChip from 'components/mui/chip';

const data = [
  {
    progress: 85,
    chipText: '+40%',
    chipColor: 'success',
    // title: 'Total Students',
    subtitle: '199 Students'
  },
  {
    progress: 65,
    chipText: '+29%',
    chipColor: 'success',
    progressColor: 'info',
    // title: 'Total Staffs',
    subtitle: '22 Staffs'
  }
];

const CardStudentandTeacher = () => {
  const renderData = data.map((item, index) => (
    <Box key={index} sx={{ ...(index !== data.length - 1 && { mb:5 }) }}>
      <Box sx={{ gap: 3, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ color: 'text.secondary' }}>{item.subtitle}</Typography>
        <CustomChip rounded size="small" skin="light" color={item.chipColor} label={item.chipText} />
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          {`${item.progress}%`}
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={item.progress} color={item.progressColor} sx={{ height: 8 }} />
    </Box>
  ));

  return (
    <Card>
      <CardContent>{renderData}</CardContent>
    </Card>
  );
};

export default CardStudentandTeacher;
