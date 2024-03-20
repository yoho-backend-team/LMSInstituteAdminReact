// material-ui
import { Grid } from '@mui/material';
import BatchViewSkeleton from 'components/cards/Skeleton/BatchViewSkeleton';
import HeaderCard from 'features/batch-management/view-batch/components/ViewBatchHeaderCard';
import ViewBatchTable from 'features/batch-management/view-batch/components/ViewBatchTable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getBatchDetails } from 'features/batch-management/batches/services/batchServices';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const ViewBatch = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const batchId = location.state.id;

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  const [batchData, setBatchData] = useState([]);


  useEffect(() => {
    const data ={
      batch_id:batchId
    }
    getBatchData(data);
  }, [dispatch,batchId]);

  const getBatchData = async (data) => {
    try {

      setLoading(false);
      const result = await getBatchDetails(data);
      if (result.success) {
        console.log('Batches:', result.data);
        setBatchData(result.data);
        setLoading(false);
      } else {
        console.log(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  console.log('batchData:',batchData)

  return (
    <>
      {loading ? (
        <BatchViewSkeleton />
      ) : (
        <Grid container spacing={3} sx={{ p: 1 }}>
          <Grid item xs={12} sm={12}>
            <HeaderCard batchData={batchData} />
          </Grid>

          <Grid item xs={12}>
            <ViewBatchTable students={batchData?.institute_batch_student} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewBatch;
