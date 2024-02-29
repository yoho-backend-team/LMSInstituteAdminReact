// ** Next Imports
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
// ** Custom Components Imports
import CustomChip from 'components/mui/chip';
// ** Utils Import

const columns = [
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Student ID',
    field: 'start_date',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.id}
      </Typography>
    )
  },
  {
    flex: 0.275,
    minWidth: 290,
    field: 'full_name',
    headerName: 'Student Name',
    renderCell: (params) => {
      const { row } = params;
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.full_name}
          </Typography>
        </Box>
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'present',
    headerName: 'Present',

    renderCell: (params) => {
      const presentStatus = present[params.row.present];

      return (
        <CustomChip
          rounded
          size="small"
          skin="light"
          color={presentStatus.color}
          label={presentStatus.title}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'absent',
    headerName: 'Absent',

    renderCell: (params) => {
      const absentStatus = absent[params.row.absent];

      return (
        <CustomChip
          rounded
          size="small"
          skin="light"
          color={absentStatus.color}
          label={absentStatus.title}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      );
    }
  }
];

const rows = [
  {
    id: 1,
    avatar: '8.png',
    full_name: "Korrie O'Crevy",
    post: 'Nuclear Power Engineer',
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    start_date: '09/23/2016',
    salary: 23896.35,
    age: '61',
    experience: '1 Year',
    present: 2,
    absent: 1
  },
  {
    id: 7,
    avatar: '',
    full_name: 'Eileen Diehn',
    post: 'Environmental Specialist',
    email: 'ediehn6@163.com',
    city: 'Lampuyang',
    start_date: '10/15/2017',
    salary: 18991.67,
    age: '59',
    experience: '9 Years',
    present: 1,
    absent: 2
  },
  {
    id: 11,
    avatar: '',
    full_name: 'De Falloon',
    post: 'Sales Representative',
    email: 'dfalloona@ifeng.com',
    city: 'Colima',
    start_date: '06/12/2018',
    salary: 19252.12,
    age: '30',
    experience: '0 Year',
    present: 1,
    absent: 1
  },
  {
    id: 3,
    avatar: '7.png',
    full_name: 'Stella Ganderton',
    post: 'Operator',
    email: 'sganderton2@tuttocitta.it',
    city: 'Golcowa',
    start_date: '03/24/2018',
    salary: 13076.28,
    age: '66',
    experience: '6 Years',
    present: 1,
    absent: 2
  },
  {
    id: 5,
    avatar: '',
    full_name: 'Harmonia Nisius',
    post: 'Senior Cost Accountant',
    email: 'hnisius4@gnu.org',
    city: 'Lucan',
    start_date: '08/25/2017',
    salary: 10909.52,
    age: '33',
    experience: '3 Years',
    present: 2,
    absent: 1
  },
  {
    id: 6,
    avatar: '',
    full_name: 'Genevra Honeywood',
    post: 'Geologist',
    email: 'ghoneywood5@narod.ru',
    city: 'Maofan',
    start_date: '06/01/2017',
    salary: 17803.8,
    age: '61',
    experience: '1 Year',
    present: 1,
    absent: 2
  },
  {
    id: 4,
    avatar: '8.png',
    full_name: 'Dorolice Crossman',
    post: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp',
    city: 'Paquera',
    start_date: '12/03/2017',
    salary: 12336.17,
    age: '22',
    experience: '2 Years',
    present: 2,
    absent: 1
  },
  {
    id: 8,
    avatar: '7.png',
    full_name: 'Richardo Aldren',
    post: 'Senior Sales Associate',
    email: 'raldren7@mtv.com',
    city: 'Skoghall',
    start_date: '11/05/2016',
    salary: 19230.13,
    age: '55',
    experience: '5 Years',
    absent: 1,
    present: 2
  },
  {
    id: 9,
    avatar: '2.png',
    full_name: 'Allyson Moakler',
    post: 'Safety Technician',
    email: 'amoakler8@shareasale.com',
    city: 'Mogilany',
    start_date: '12/29/2018',
    salary: 11677.32,
    age: '39',
    experience: '9 Years',
    present: 1,
    absent: 2
  },
  {
    id: 10,
    avatar: '7.png',
    full_name: 'Merline Penhalewick',
    post: 'Junior Executive',
    email: 'mpenhalewick9@php.net',
    city: 'Kanuma',
    start_date: '04/19/2019',
    salary: 15939.52,
    age: '23',
    experience: '3 Years',
    present: 2,
    absent: 1
  },
  {
    id: 12,
    avatar: '',
    full_name: 'Cyrus Gornal',
    post: 'Senior Sales Associate',
    email: 'cgornalb@fda.gov',
    city: 'Boro Utara',
    start_date: '12/09/2017',
    salary: 16745.47,
    age: '22',
    experience: '2 Years',
    present: 2,
    absent: 1
  },
  {
    id: 13,
    avatar: '',
    full_name: 'Tallou Balf',
    post: 'Staff Accountant',
    email: 'tbalfc@sina.com.cn',
    city: 'Siliana',
    start_date: '01/21/2016',
    salary: 15488.53,
    age: '36',
    experience: '6 Years',
    present: 1,
    absent: 2
  },
  {
    id: 14,
    avatar: '',
    full_name: 'Othilia Extill',
    post: 'Associate Professor',
    email: 'oextilld@theatlantic.com',
    city: 'Brzyska',
    start_date: '02/01/2016',
    salary: 18442.34,
    age: '43',
    experience: '3 Years',
    present: 2,
    absent: 1
  },
  {
    id: 15,
    avatar: '',
    full_name: 'Wilmar Bourton',
    post: 'Administrative Assistant',
    email: 'wbourtone@sakura.ne.jp',
    city: 'Bích Động',
    start_date: '04/25/2018',
    salary: 13304.45,
    age: '19',
    experience: '9 Years',
    present: 2,
    absent: 1
  },
  {
    id: 16,
    avatar: '4.png',
    full_name: 'Robinson Brazenor',
    post: 'General Manager',
    email: 'rbrazenorf@symantec.com',
    city: 'Gendiwu',
    start_date: '12/23/2017',
    salary: 11953.08,
    age: '66',
    experience: '6 Years',
    present: 2,
    absent: 1
  },
  {
    id: 17,
    avatar: '',
    full_name: 'Nadia Bettenson',
    post: 'Environmental Tech',
    email: 'nbettensong@joomla.org',
    city: 'Chabařovice',
    start_date: '07/11/2018',
    salary: 20484.44,
    age: '64',
    experience: '4 Years',
    present: 1,
    absent: 2
  },
  {
    id: 18,
    avatar: '',
    full_name: 'Titus Hayne',
    post: 'Web Designer',
    email: 'thayneh@kickstarter.com',
    city: 'Yangon',
    start_date: '05/25/2019',
    salary: 16871.48,
    age: '59',
    experience: '9 Years',
    present: 1,
    absent: 2
  },
  {
    id: 19,
    avatar: '4.png',
    full_name: 'Roxie Huck',
    post: 'Administrative Assistant',
    email: 'rhucki@ed.gov',
    city: 'Polýkastro',
    start_date: '04/04/2019',
    salary: 19653.56,
    age: '41',
    experience: '1 Year',
    present: 2,
    absent: 1
  },
  {
    id: 20,
    avatar: '7.png',
    full_name: 'Latashia Lewtey',
    post: 'Actuary',
    email: 'llewteyj@sun.com',
    city: 'Hougong',
    start_date: '08/03/2017',
    salary: 18303.87,
    age: '35',
    experience: '5 Years',
    present: 1,
    absent: 1
  }
];

const present = {
  1: { title: 'Present', color: 'success' },
  2: { title: 'Absent', color: 'error' }
};

const absent = {
  1: { title: 'Present', color: 'success' },
  2: { title: 'Absent', color: 'error' }
};

const StudentAttendanceTable = () => {
  return (
    <Card>
      <DataGrid autoHeight rowHeight={80} rows={rows} columns={columns} disableRowSelectionOnClick />
    </Card>
  );
};

export default StudentAttendanceTable;
