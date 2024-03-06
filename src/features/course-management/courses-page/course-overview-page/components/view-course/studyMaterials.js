// ** React Import
import { useState } from 'react';
import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, MenuItem, Button } from '@mui/material';
import OptionsMenu from 'components/option-menu';
import Icon from 'components/icon'
// ** renders client column
import DeleteDialog from 'components/modal/DeleteModel';
import StatusDialog from 'components/modal/DeleteModel';

export const row = [
  {
    id: 1,
    avatar: '8.png',
    course_title: "Korrie O'Crevy",
    post: 'Nuclear Power Engineer',
    Subtitle: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    category: 'MERN-Stack Development',
    salary: 23896.35,
    age: '61',
    experience: '1 Year',
    status: 2
  },
  {
    id: 7,
    avatar: '',
    course_title: 'Eileen Diehn',
    post: 'Environmental Specialist',
    Subtitle: 'ediehn6@163.com',
    city: 'Lampuyang',
    category: 'MERN-Stack Development',
    salary: 18991.67,
    age: '59',
    experience: '9 Years',
    status: 3
  },
  {
    id: 11,
    avatar: '',
    course_title: 'De Falloon',
    post: 'Sales Representative',
    Subtitle: 'dfalloona@ifeng.com',
    city: 'Colima',
    category: 'MERN-Stack Development',
    salary: 19252.12,
    age: '30',
    experience: '0 Year',
    status: 4
  },
  {
    id: 3,
    avatar: '7.png',
    course_title: 'Stella Ganderton',
    post: 'Operator',
    Subtitle: 'sganderton2@tuttocitta.it',
    city: 'Golcowa',
    category: 'MERN-Stack Development',
    salary: 13076.28,
    age: '66',
    experience: '6 Years',
    status: 5
  },
  {
    id: 5,
    avatar: '',
    course_title: 'Harmonia Nisius',
    post: 'Senior Cost Accountant',
    Subtitle: 'hnisius4@gnu.org',
    city: 'Lucan',
    category: 'MERN-Stack Development',
    salary: 10909.52,
    age: '33',
    experience: '3 Years',
    status: 2
  },
  {
    id: 6,
    avatar: '',
    course_title: 'Genevra Honeywood',
    post: 'Geologist',
    Subtitle: 'ghoneywood5@narod.ru',
    city: 'Maofan',
    category: 'MERN-Stack Development',
    salary: 17803.8,
    age: '61',
    experience: '1 Year',
    status: 1
  },
  {
    id: 4,
    avatar: '8.png',
    course_title: 'Dorolice Crossman',
    post: 'Cost Accountant',
    Subtitle: 'dcrossman3@google.co.jp',
    city: 'Paquera',
    category: 'MERN-Stack Development',
    salary: 12336.17,
    age: '22',
    experience: '2 Years',
    status: 2
  },
  {
    id: 8,
    avatar: '7.png',
    course_title: 'Richardo Aldren',
    post: 'Senior Sales Associate',
    Subtitle: 'raldren7@mtv.com',
    city: 'Skoghall',
    category: 'MERN-Stack Development',
    salary: 19230.13,
    age: '55',
    experience: '5 Years',
    status: 3
  },
  {
    id: 9,
    avatar: '2.png',
    course_title: 'Allyson Moakler',
    post: 'Safety Technician',
    Subtitle: 'amoakler8@shareasale.com',
    city: 'Mogilany',
    category: 'MERN-Stack Development',
    salary: 11677.32,
    age: '39',
    experience: '9 Years',
    status: 5
  },
  {
    id: 10,
    avatar: '7.png',
    course_title: 'Merline Penhalewick',
    post: 'Junior Executive',
    Subtitle: 'mpenhalewick9@php.net',
    city: 'Kanuma',
    category: 'MERN-Stack Development',
    salary: 15939.52,
    age: '23',
    experience: '3 Years',
    status: 2
  },
  {
    id: 12,
    avatar: '',
    course_title: 'Cyrus Gornal',
    post: 'Senior Sales Associate',
    Subtitle: 'cgornalb@fda.gov',
    city: 'Boro Utara',
    category: 'MERN-Stack Development',
    salary: 16745.47,
    age: '22',
    experience: '2 Years',
    status: 4
  },
  {
    id: 13,
    avatar: '',
    course_title: 'Tallou Balf',
    post: 'Staff Accountant',
    Subtitle: 'tbalfc@sina.com.cn',
    city: 'Siliana',
    category: 'MERN-Stack Development',
    salary: 15488.53,
    age: '36',
    experience: '6 Years',
    status: 4
  },
  {
    id: 14,
    avatar: '',
    course_title: 'Othilia Extill',
    post: 'Associate Professor',
    Subtitle: 'oextilld@theatlantic.com',
    city: 'Brzyska',
    category: 'MERN-Stack Development',
    salary: 18442.34,
    age: '43',
    experience: '3 Years',
    status: 2
  },
  {
    id: 15,
    avatar: '',
    course_title: 'Wilmar Bourton',
    post: 'Administrative Assistant',
    Subtitle: 'wbourtone@sakura.ne.jp',
    city: 'Bích Động',
    category: 'MERN-Stack Development',
    salary: 13304.45,
    age: '19',
    experience: '9 Years',
    status: 5
  },
  {
    id: 16,
    avatar: '4.png',
    course_title: 'Robinson Brazenor',
    post: 'General Manager',
    Subtitle: 'rbrazenorf@symantec.com',
    city: 'Gendiwu',
    category: 'MERN-Stack Development',
    salary: 11953.08,
    age: '66',
    experience: '6 Years',
    status: 5
  },
  {
    id: 17,
    avatar: '',
    course_title: 'Nadia Bettenson',
    post: 'Environmental Tech',
    Subtitle: 'nbettensong@joomla.org',
    city: 'Chabařovice',
    category: 'MERN-Stack Development',
    salary: 20484.44,
    age: '64',
    experience: '4 Years',
    status: 1
  },
  {
    id: 18,
    avatar: '',
    course_title: 'Titus Hayne',
    post: 'Web Designer',
    Subtitle: 'thayneh@kickstarter.com',
    city: 'Yangon',
    category: 'MERN-Stack Development',
    salary: 16871.48,
    age: '59',
    experience: '9 Years',
    status: 1
  },
  {
    id: 19,
    avatar: '4.png',
    course_title: 'Roxie Huck',
    post: 'Administrative Assistant',
    Subtitle: 'rhucki@ed.gov',
    city: 'Polýkastro',
    category: 'MERN-Stack Development',
    salary: 19653.56,
    age: '41',
    experience: '1 Year',
    status: 4
  },
  {
    id: 20,
    avatar: '7.png',
    course_title: 'Latashia Lewtey',
    post: 'Actuary',
    Subtitle: 'llewteyj@sun.com',
    city: 'Hougong',
    category: 'MERN-Stack Development',
    salary: 18303.87,
    age: '35',
    experience: '5 Years',
    status: 1
  },
  {
    id: 21,
    avatar: '',
    course_title: 'Natalina Tyne',
    post: 'Software Engineer',
    Subtitle: 'ntynek@merriam-webster.com',
    city: 'Yanguan',
    category: 'MERN-Stack Development',
    salary: 15256.4,
    age: '30',
    experience: '0 Year',
    status: 2
  },
  {
    id: 22,
    avatar: '',
    course_title: 'Faun Josefsen',
    post: 'Analog Circuit Design manager',
    Subtitle: 'fjosefsenl@samsung.com',
    city: 'Wengyang',
    category: 'MERN-Stack Development',
    salary: 11209.16,
    age: '40',
    experience: '0 Year',
    status: 3
  },
  {
    id: 23,
    avatar: '7.png',
    course_title: 'Rosmunda Steed',
    post: 'Assistant Media Planner',
    Subtitle: 'rsteedm@xing.com',
    city: 'Manzanares',
    category: 'MERN-Stack Development',
    salary: 13778.34,
    age: '21',
    experience: '1 Year',
    status: 5
  },
  {
    id: 24,
    avatar: '',
    course_title: 'Scott Jiran',
    post: 'Graphic Designer',
    Subtitle: 'sjirann@simplemachines.org',
    city: 'Pinglin',
    category: 'MERN-Stack Development',
    salary: 23081.71,
    age: '23',
    experience: '3 Years',
    status: 1
  },
  {
    id: 25,
    avatar: '',
    course_title: 'Carmita Medling',
    post: 'Accountant',
    Subtitle: 'cmedlingo@hp.com',
    city: 'Bourges',
    category: 'MERN-Stack Development',
    salary: 13602.24,
    age: '47',
    experience: '7 Years',
    status: 3
  },
  {
    id: 26,
    avatar: '2.png',
    course_title: 'Morgen Benes',
    post: 'Senior Sales Associate',
    Subtitle: 'mbenesp@ted.com',
    city: 'Cà Mau',
    category: 'MERN-Stack Development',
    salary: 16969.63,
    age: '42',
    experience: '2 Years',
    status: 4
  },
  {
    id: 27,
    avatar: '',
    course_title: 'Onfroi Doughton',
    post: 'Civil Engineer',
    Subtitle: 'odoughtonq@aboutads.info',
    city: 'Utrecht (stad)',
    category: 'MERN-Stack Development',
    salary: 23796.62,
    age: '28',
    experience: '8 Years',
    status: 3
  },
  {
    id: 28,
    avatar: '',
    course_title: 'Kliment McGinney',
    post: 'Chief Design Engineer',
    Subtitle: 'kmcginneyr@paginegialle.it',
    city: 'Xiaocheng',
    category: 'MERN-Stack Development',
    salary: 24027.81,
    age: '28',
    experience: '8 Years',
    status: 4
  },
  {
    id: 29,
    avatar: '',
    course_title: 'Devin Bridgland',
    post: 'Tax Accountant',
    Subtitle: 'dbridglands@odnoklassniki.ru',
    city: 'Baoli',
    category: 'MERN-Stack Development',
    salary: 13508.15,
    age: '48',
    experience: '8 Years',
    status: 3
  },
  {
    id: 30,
    avatar: '6.png',
    course_title: 'Gilbert McFade',
    post: 'Biostatistician',
    Subtitle: 'gmcfadet@irs.gov',
    city: 'Deje',
    category: 'MERN-Stack Development',
    salary: 21632.3,
    age: '20',
    experience: '0 Year',
    status: 2
  },
  {
    id: 31,
    avatar: '',
    course_title: 'Teressa Bleakman',
    post: 'Senior Editor',
    Subtitle: 'tbleakmanu@phpbb.com',
    city: 'Žebrák',
    category: 'MERN-Stack Development',
    salary: 24875.41,
    age: '37',
    experience: '7 Years',
    status: 5
  },
  {
    id: 32,
    avatar: '',
    course_title: 'Marcelia Alleburton',
    post: 'Safety Technician',
    Subtitle: 'malleburtonv@amazon.com',
    city: 'Basail',
    category: 'MERN-Stack Development',
    salary: 23888.98,
    age: '53',
    experience: '3 Years',
    status: 2
  },
  {
    id: 33,
    avatar: '7.png',
    course_title: 'Aili De Coursey',
    post: 'Environmental Specialist',
    Subtitle: 'adew@etsy.com',
    city: 'Łazy',
    category: 'MERN-Stack Development',
    salary: 14082.44,
    age: '27',
    experience: '7 Years',
    status: 5
  },
  {
    id: 34,
    avatar: '6.png',
    course_title: 'Charlton Chatres',
    post: 'Analyst Programmer',
    Subtitle: 'cchatresx@goo.gl',
    city: 'Reguengos de Monsaraz',
    category: 'MERN-Stack Development',
    salary: 21386.52,
    age: '22',
    experience: '2 Years',
    status: 3
  },
  {
    id: 35,
    avatar: '1.png',
    course_title: 'Nat Hugonnet',
    post: 'Financial Advisor',
    Subtitle: 'nhugonnety@wufoo.com',
    city: 'Pimentel',
    category: 'MERN-Stack Development',
    salary: 13835.97,
    age: '46',
    experience: '6 Years',
    status: 4
  },
  {
    id: 36,
    avatar: '',
    course_title: 'Lorine Hearsum',
    post: 'Payment Adjustment Coordinator',
    Subtitle: 'lhearsumz@google.co.uk',
    city: 'Shuiying',
    category: 'MERN-Stack Development',
    salary: 22093.91,
    age: '47',
    experience: '7 Years',
    status: 4
  },
  {
    id: 37,
    avatar: '5.png',
    course_title: 'Sheila-kathryn Haborn',
    post: 'Environmental Specialist',
    Subtitle: 'shaborn10@about.com',
    city: 'Lewolang',
    category: 'MERN-Stack Development',
    salary: 24624.23,
    age: '51',
    experience: '1 Year',
    status: 3
  },
  {
    id: 38,
    avatar: '3.png',
    course_title: 'Alma Harvatt',
    post: 'Administrative Assistant',
    Subtitle: 'aharvatt11@addtoany.com',
    city: 'Ulundi',
    category: 'MERN-Stack Development',
    salary: 21782.82,
    age: '41',
    experience: '1 Year',
    status: 1
  },
  {
    id: 39,
    avatar: '2.png',
    course_title: 'Beatrix Longland',
    post: 'VP Quality Control',
    Subtitle: 'blongland12@gizmodo.com',
    city: 'Damu',
    category: 'MERN-Stack Development',
    salary: 22794.6,
    age: '62',
    experience: '2 Years',
    status: 2
  },
  {
    id: 40,
    avatar: '4.png',
    course_title: 'Hammad Condell',
    post: 'Project Manager',
    Subtitle: 'hcondell13@tiny.cc',
    city: 'Bulung’ur',
    category: 'MERN-Stack Development',
    salary: 10872.83,
    age: '37',
    experience: '7 Years',
    status: 4
  },
  {
    id: 41,
    avatar: '',
    course_title: 'Parker Bice',
    post: 'Technical Writer',
    Subtitle: 'pbice14@ameblo.jp',
    city: 'Shanlian',
    category: 'MERN-Stack Development',
    salary: 17471.92,
    age: '65',
    experience: '5 Years',
    status: 5
  },
  {
    id: 42,
    avatar: '',
    course_title: 'Lowrance Orsi',
    post: 'Biostatistician',
    Subtitle: 'lorsi15@wp.com',
    city: 'Dengteke',
    category: 'MERN-Stack Development',
    salary: 24719.51,
    age: '64',
    experience: '4 Years',
    status: 1
  },
  {
    id: 43,
    avatar: '8.png',
    course_title: 'Ddene Chaplyn',
    post: 'Environmental Tech',
    Subtitle: 'dchaplyn16@nymag.com',
    city: 'Lattes',
    category: 'MERN-Stack Development',
    salary: 11958.33,
    age: '38',
    experience: '8 Years',
    status: 2
  },
  {
    id: 44,
    avatar: '',
    course_title: 'Washington Bygraves',
    post: 'Human Resources Manager',
    Subtitle: 'wbygraves17@howstuffworks.com',
    city: 'Zlaté Hory',
    category: 'MERN-Stack Development',
    salary: 10552.43,
    age: '37',
    experience: '7 Years',
    status: 1
  },
  {
    id: 45,
    avatar: '7.png',
    course_title: 'Meghann Bodechon',
    post: 'Operator',
    Subtitle: 'mbodechon18@1und1.de',
    city: 'Itō',
    category: 'MERN-Stack Development',
    salary: 23024.28,
    age: '61',
    experience: '1 Year',
    status: 4
  },
  {
    id: 46,
    avatar: '1.png',
    course_title: 'Moshe De Ambrosis',
    post: 'Recruiting Manager',
    Subtitle: 'mde19@purevolume.com',
    city: 'San Diego',
    category: 'MERN-Stack Development',
    salary: 10409.9,
    age: '47',
    experience: '7 Years',
    status: 5
  },
  {
    id: 47,
    avatar: '4.png',
    course_title: 'Had Chatelot',
    post: 'Cost Accountant',
    Subtitle: 'hchatelot1a@usatoday.com',
    city: 'Mercedes',
    category: 'MERN-Stack Development',
    salary: 11446.3,
    age: '64',
    experience: '4 Years',
    status: 4
  },
  {
    id: 48,
    avatar: '',
    course_title: 'Georgia McCrum',
    post: 'Registered Nurse',
    Subtitle: 'gmccrum1b@icio.us',
    city: 'Nggalak',
    category: 'MERN-Stack Development',
    salary: 14002.31,
    age: '63',
    experience: '3 Years',
    status: 1
  },
  {
    id: 49,
    avatar: '5.png',
    course_title: 'Krishnah Stilldale',
    post: 'VP Accounting',
    Subtitle: 'kstilldale1c@chronoengine.com',
    city: 'Slavs’ke',
    category: 'MERN-Stack Development',
    salary: 10704.29,
    age: '56',
    experience: '6 Years',
    status: 1
  },
  {
    id: 50,
    avatar: '4.png',
    course_title: 'Mario Umbert',
    post: 'Research Assistant',
    Subtitle: 'mumbert1d@digg.com',
    city: 'Chorotis',
    category: 'MERN-Stack Development',
    salary: 21813.54,
    age: '43',
    experience: '3 Years',
    status: 1
  },
  {
    id: 95,
    avatar: '2.png',
    course_title: 'Edwina Ebsworth',
    post: 'Human Resources Assistant',
    Subtitle: 'eebsworth2m@sbwire.com',
    city: 'Puzi',
    category: 'MERN-Stack Development',
    salary: 19586.23,
    age: '27',
    experience: '2 Years',
    status: 1
  }
];
const renderClient = () => {};

const StudyMaterials = () => {
  const [statusValue, setStatusValue] = useState(0);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusOpen, setStatusDialogOpen] = useState(false);

  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
    setStatusDialogOpen(true);
  };
  
  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const columns = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 's_material_title',
      headerName: 'Title',
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.course_title}
              </Typography>
              <Typography noWrap variant="caption">
                {row.Subtitle}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.175,
      type: 'category',
      minWidth: 120,
      headerName: 'Category',
      field: 's_material_category',
      // valueGetter: params => new Date(params.value),
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {params.row.category}
        </Typography>
      )
    },
    {
      flex: 0.150,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: () => {
        return (
            <Button variant='contained' color='success' size='small' sx={{'&.MuiButton-root':{boxShadow:'none'},p:0}}>
                 <TextField select fullWidth label="" SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }} width={100} size='small'
                 sx={{border:'none !important'}}
                 >
            <MenuItem value="0" sx={{p:1}}>Active</MenuItem>
            <MenuItem value="1" sx={{p:1}}>Deactive</MenuItem>
          </TextField>
            </Button>
         
        );
      }
    },
    {
      flex: 0.125,
      field: 'actions',
      minWidth: 80,
      headerName: 'Actions',
      renderCell: () => (
        <OptionsMenu
        sx={{'& .MuiButtonBase-root':{p:0}}}
        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary','& .MuiButtonBase-root':{p:0}}, }}
        options={[
          {
            text: 'View',
            icon: <Icon icon="tabler:eye" fontSize={20} />,
            menuItemProps: {
              onClick: () => handleView()
            }
          },
          {
            text: 'Edit',
            icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
            menuItemProps: {
              onClick: () => toggleEditUserDrawer()
            }
          },
          {
            text: 'Delete',
            icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
            menuItemProps: {
              onClick: () => {
                handleDelete();
              }
            }
          }
        ]}
      />
      )
    }
  ];
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  return (
    <Box>
      <DataGrid
        autoHeight
        rows={row}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <DeleteDialog
      open={isDeleteDialogOpen}
      setOpen={setDeleteDialogOpen}
      description="Are you sure you want to delete this item?"
      title="Delete"
    />
    <StatusDialog
      open={statusOpen}
      setOpen={setStatusDialogOpen}
      description="Are you sure you want to Change Status"
      title="Status"
    />
    </Box>

  );
};

export default StudyMaterials;
