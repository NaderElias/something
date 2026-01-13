import  ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Email from "@mui/icons-material/Email";
import Notifications from "@mui/icons-material/Notifications";
import Settings from "@mui/icons-material/Settings";
import {Avatar,Badge,Box,IconButton,Stack,Typography} from "@mui/material";
import userPic from "../../assets/userpic.png";
import React, { type JSX } from "react";

//since we dont have a breadcrumb component or routes or other pages, we make a simple one here
const breadcrumbItems = [{label:"Dashboard",isActive:false},
    {label:"HR manage",isActive:false},
    {label:"Departments",isActive:false},
    {label:"View Department Details",isActive:true},
];



export const DepartmentHeaderSection = (): JSX.Element => {
    return(
        <Box className="translate-y-0.5 animate-fade-in " sx={{display:"flex",alignItems:"center", justifyContent: "space-between",px:5,py:3}}>
        <Stack spacing={1}>
            <Typography variant="h5" sx={{fontFamily:"Poppins,Helvetica", fontWeight:600, color:"#151d48",fontSize:"26px",letterSpacing:"0.5px",}}> View Department Details</Typography>

            <Stack direction="row" spacing={1} alignItems="center">
                {breadcrumbItems.map((item,index)=>(
                    <Stack key={index} direction="row" spacing={1} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{fontFamily:"Poppins,Helvetica",fontSize:"12px",color: item.isActive ? "#003fad" : "#8B8D97",cursor: item.isActive ? "default" : "pointer","&:hover":!item.isActive ? {textDecoration:"underline"}:{}}}>
                                {item.label}
                            </Typography>
                            {index < breadcrumbItems.length -1 &&(<ChevronRightIcon sx={{width:12,height:12,color:"#8B8D97"}}/>)}

                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
                <IconButton sx={{p:1.5}}>
                    <Badge badgeContent="" sx={{"& .muiBadge-badge":{backgroundColor:"#ff0020",width:10,height:10,borderRadius:"50%",minWidth:10,top:6,right:6}}}>
                        <Notifications sx={{width:24,height:24,color:"#8B8D97"}}/>

                    </Badge>
                </IconButton>

                <IconButton sx={{p:1.5}}>
                    <Email sx={{width:24,height:24,color:"#8B8D97"}}/>
                </IconButton>
                
                <IconButton sx={{p:1.5}}>
                    <Settings sx={{width:24,height:24,color:"#8B8D97"}}/>
                </IconButton>
                <Avatar src={userPic} sx={{width:40,height:40}}/>



        </Stack>
        </Box>
    )
}