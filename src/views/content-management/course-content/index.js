// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Card from '@mui/material/Card';
import StudyMaterial from 'features/content-management/course-contents/components/StudyMaterialDataGrid';
import Notes from 'features/content-management/course-contents/components/NotesDataGrid';
import CourseModule from 'features/course-management/add-course/components/CourseModule';
const TabsFullWidth = () => {
  // ** State
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ minHeight: '100vh', p: 2 }}>
      <TabContext value={value}>
        <TabList variant="fullWidth" onChange={handleChange} aria-label="full width tabs example">
          <Tab value="1" label="Study Materials" />
          <Tab value="2" label="Notes" />
          <Tab value="3" label="Modules" />
          <Tab value="4" label="Question Papers" />
        </TabList>
        <TabPanel value="1" sx={{ p: 0 }}>
          <StudyMaterial />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 0 }}>
          <Notes />
        </TabPanel>
        <TabPanel value="3" >
          <CourseModule />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default TabsFullWidth;
