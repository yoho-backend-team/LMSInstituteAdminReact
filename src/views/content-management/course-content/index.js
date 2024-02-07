// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Card from '@mui/material/Card';
import StudyMaterial from 'features/content-management/course-contents/components/StudyMaterialDataGrid';
import Notes from 'features/content-management/course-contents/components/NotesDataGrid';
import Module from 'features/content-management/course-contents/components/ModuleDataGrid';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const TabsFullWidth = () => {
  const [value, setValue] = useState('1');
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const dataLoaded = true; 

  useTimeout(() => {
    setLoading(false); 
  }, 1000);

  return (
    <div>
      {loading ? (
        <ContentSkeleton/>
      ) : (
        <Card sx={{ minHeight: '100vh', p: 2 }}>
          <TabContext value={value}>
            <TabList variant="fullWidth" onChange={handleChange} aria-label="full width tabs example">
              <Tab value="1" label="Study Materials" />
              <Tab value="2" label="Notes" />
              <Tab value="3" label="Modules" />
            </TabList>
            <TabPanel value="1" sx={{ p: 0 }}>
              {dataLoaded && <StudyMaterial />}
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              {dataLoaded && <Notes />}
            </TabPanel>
            <TabPanel value="3" sx={{ p: 0 }}>
              {dataLoaded && <Module />}
            </TabPanel>
          </TabContext>
        </Card>
      )}
    </div>
  );
};

export default TabsFullWidth;
