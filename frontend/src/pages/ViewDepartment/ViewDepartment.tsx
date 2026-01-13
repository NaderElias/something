import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box,Divider,IconButton,Paper,Stack} from "@mui/material";
import React, { type JSX } from "react";
import { DepartmentHeaderSection } from "../../components/DepartmentHeaderSection";
import { DepartmentInfoSection } from "../../components/DepartmentInfoSection";
import { AssignedEmployeesSection } from "../../components/AssignedEmployeesSection";
import performlyLogo from "../../assets/performly_logo.png";
 // the vertical nav bar items
const navItems=[
    {icon:DashboardIcon,active:true,alt:"Dashboard"},
    {icon:PeopleIcon,active:false,alt:"People"},
    {icon:AssignmentIcon,active:false,alt:"Assignments"},
    {icon:BarChartIcon,active:false,alt:"Analytics"},
    {icon:SettingsIcon,active:false,alt:"Settings"},
];

export const ViewDepartment = (): JSX.Element => {
    return(
        <Box sx={{display:"flex", minHeight:"100vh",bgcolor:"#f8f9fa",border:"1px solid #f8f9fa"}} data-model-id="1:9870">
            <Box component="nav" sx={{width:105, bgcolor:"white",borderRight:"1px solid #e7eaee",borderRadius:"4px 0 0 4px",py:5,px:"30px",display: "flex",flexDirection:"column",alignItems:"center",gap:5}}>
                <Box component="img" src={performlyLogo} alt="preformly logo" sx={{width:45, height:45,objectFit:"cover"}}/>
                <Stack spacing ={3}>
                    {navItems.map((_item,index)=>{
                        const IconComponent = _item.icon;
                        return(
                            <IconButton key={index} sx={{p:1.5, bgcolor:_item.active ? "#003fad" : "transparent", borderRadius:2,"&:hover":{bgcolor:_item.active ? "#003fad" : "rgba(0,63,173,0.08)"}}}>
                                <IconComponent sx={{width:24,height:24,color:_item.active ? "white" : "#6c757d"}}/>
                            </IconButton>
                        );
                    })}


                </Stack>
            </Box>
            <Box component ="main" sx={{flex:1,p:5,pl:"148px"}}>
                <Stack spacing={5}>

                    <Box className="translate-y-[-1rem] animate-fade-in  ">
                        <DepartmentHeaderSection/>
                    </Box>
                    
                    <Paper elevation={0} sx={{borderRadius:"20px",boxShadow:"0px 4px 20px rgba(237, 237, 237, 0.5)",border:"1px solid #f8f9fa",overflow:"hidden"}} className="translate-y-[-1rem] animate-fade-in   [--animation-delay:200ms]">
                        <Stack spacing={5} sx={{p:5}}>
                            <DepartmentInfoSection/>
                            <Divider sx={{borderColor:"#e7eaee"}}/>
                            <AssignedEmployeesSection/>
                        </Stack>
                    </Paper>
                </Stack>

            
        </Box>
        </Box>
    );
};