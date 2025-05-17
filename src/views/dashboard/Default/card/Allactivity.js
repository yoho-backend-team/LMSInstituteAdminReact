import { CircularProgress, Divider, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import client from 'api/client';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { imagePlaceholder } from 'utils/placeholders';

const AllActivity = () => {
  const theme = useTheme();
  const [Logs, setLogs] = useState([]);
  const [page_details,setPageDetails] = useState(null)
  const [page,setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null)
  const observerRef = useRef(null)
  console.log("logs data", Logs);

  const getAllUserActivity = useCallback(async (page) => {
    const data = { page : page}
    setLoading(true)
    try {
      const response = await client.activity.get(data);
      setLogs((prevLogs) => [...prevLogs ,...response?.data]);
      setPageDetails(response?.pagination) 
      if(response?.pagination?.currentPage >= response?.pagination?.totalPages){
         setHasMore(false)
      }
    } catch (error) {
      setHasMore(false)
      console.log(error,"error")
    }
    setLoading(false)
  },[])

  const handleScroll = useCallback((entries) => {
    const [ entry ] = entries
    if(entry.isIntersecting && hasMore && !loading ){
       setPage((prevPage) => prevPage + 1)
    }
  },[hasMore,loading])

  useEffect(() => {
    getAllUserActivity(1);
  },[])

  useEffect(() => {
   if(page > 1) getAllUserActivity(page)
  },[page,getAllUserActivity])

  useEffect(() => {
    const option = {
      root : containerRef.current,
      rootMargin: "0px",
      threshold : 0.5
    }

    observerRef.current = new IntersectionObserver(handleScroll,option)
    const sentinel = document.querySelector("#sentinel")

    if(sentinel) observerRef.current.observe(sentinel)

    return () => {
      if(observerRef.current && sentinel ){
        observerRef.current.unobserve(sentinel)
      }
    }
  }, [handleScroll]);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2.5, fontWeight: 600, textAlign: 'left',mt:2.5 }}>
        Recent Activities
      </Typography>
      <Card
        ref={containerRef}
        sx={{
          mt:7.5,
          backgroundColor: "white",
          p: 3,
          height: "455px",
          overflow: 'auto',
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          backgroundColor: '#f0f9ff',
          
       
          
        }}
      >
        <Box>
          {Logs.map((item, index) => {
            return (
              <Box key={index} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    backgroundColor: '#f0f9ff',
                   padding:"20px",
                   border:"1px solid #d1e8ff",
                   
                    '&:hover': {
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
                      backgroundColor: '#d1e8ff',
                      
                      
                    },
                    
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: 2,
                    }}
                    src={item.imgSrc ?? imagePlaceholder}
                    alt={item.title}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ color: theme.palette.primary.dark, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                      {item.user?.first_name} | {item?.action} | {item?.details}
                    </Typography>
                  </Box>
                </Box>
                {index !== Logs.length - 1 && (
                  <Divider sx={{ borderColor: theme.palette.grey[300] }} />
                )}
              </Box>
            );
          })}
          { loading && <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}> <CircularProgress /> </Box>}
          {!loading && hasMore && <div id="sentinel" style={{ height: "1px" }} />}
          {!hasMore && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}> <Typography>No more activities</Typography> </Box>}
        </Box>
      </Card>
    </>
  );
};

export default AllActivity;
