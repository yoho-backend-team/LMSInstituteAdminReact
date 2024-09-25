import { TabContext, TabPanel } from "@mui/lab"
import MuiTabList from "@mui/lab/TabList"
import { Box } from "@mui/material"
import { styled } from "@mui/material"
import MuiTab from "@mui/material/Tab"
import { useState } from "react"
import InstituteDetails from "./views/institute-details"
import { useInstitute } from "utils/get-institute-details"

const Tab = styled(MuiTab)(({theme}) => ({
    flexDirection : "row",
    '& svg ' : {
        marginBottom : "0",
        marginRight : theme.spacing(1.5)
    }
}))

const TabList = styled(MuiTabList)(({theme}) => ({
    borderBottom : "0 !important",
    "& &.Mui-Tabs-scroller" : {
        boxSizing: "content-box",
        padding : theme.spacing(1.25,1,1),
        margin : `${theme.spacing(-1,-1,-2)} !important`
    },
    "& .MuiTabs-indicator" : {
        display : "none"
    },
    "& .Mui-selected" : {
        boxShadow : theme.shadows[2],
        backgroundColor : theme.palette.primary.main,
        color : `${theme.palette.common.white} !important`
    }

}))

const MainSettingsPage = () => {
    const [activeTab,setActiveTab] = useState("institute")
    const institute = useInstitute().getDetails()

    const handleTabChange = (e,value) => {
       setActiveTab(value)    
    }

    return(
          <TabContext value={activeTab} >
             <TabList
             variant="scrollable"
             scrollButtons="auto"
             onChange={handleTabChange}
             aria-label="forced scroll tabs example"
             >
               <Tab value={"institute"} label={"Institute"} />
               <Tab value={"about"} label={"About"}  />
             </TabList> 
             <Box sx={{ mt: 4 }} >
               <TabPanel value="institute" >
                 <InstituteDetails institute={institute} />
               </TabPanel>
             </Box>
          </TabContext>   
    )
}

export default MainSettingsPage