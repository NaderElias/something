import React, { useEffect, useState,  type JSX } from "react";
import viewpic from "../../assets/view.svg";
import exitpic from "../../assets/exit.svg";
import { useQuery, useMutation } from '@apollo/client/react';
import { DELETE_EMPLOYEE } from "../../queries/department";
import { GET_DEPARTMENT } from "../../queries/department";
import type { department } from '../../interfaces/types';

import {
    Box,IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Stack,
    TableContainer
} from "@mui/material";



// interfaces for the query
interface GetDepartmentData {
  department: department;
}

interface GetDepartmentVars {
  id: number;
}



export const AssignedEmployeesSection = (): JSX.Element => {
    const { data, loading, error } = useQuery<GetDepartmentData, GetDepartmentVars>(
      GET_DEPARTMENT,
      {
        variables: { id: 1 }, // or any placeholder id just cuz we only have one department
      }
    );
    // the states so we can update the UI after deletion
const [employeesData, setEmployeesData] = useState(() => data?.department?.employees ?? []);console.log(employeesData);
useEffect(() => {
  if (data?.department?.employees) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmployeesData((prev) => {
      // only update if data has changed
      if (prev?.length !== data.department.employees.length) {
        return data.department.employees;
      }
      return prev;
    });
  }
}, [data?.department?.employees]);

//calling the mutation
const [deleteEmployee] = useMutation<{ deleteEmployee: boolean }, { id: number }>(DELETE_EMPLOYEE);

// the deletion function calling the mutation deletion api
const handleDelete = async (employeeId: number) => {
  const res = await deleteEmployee({ variables: { id: employeeId } });

  if (!res.data?.deleteEmployee) return;

  // Remove deleted employee from state
  setEmployeesData((prev) => prev?.filter((e) => e.id !== employeeId) ?? []);
};


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>; 

    
    if (!employeesData) return <p>No Employees Found</p>;
    return (
        <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontFamily: "Poppins, Helvetica" ,fontWeight:5000, fontSize:"20px", mb:2}}>
                Assigned Employees
            </Typography>
            <TableContainer sx={{backgroundColor:"#ffffff",borderRadius:"5px",overflow:"hidden",}}>
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ fontFamily:"Poppins, Helvetica",fontWeight:400,color:"#939393",fontSize:"14.5px",letterSpacing:"0.14px",borderBottom:"1px solid #efefef",height:"80px",px:2,py:2}}>ID</TableCell>
                        <TableCell sx={{ fontFamily:"Poppins, Helvetica",fontWeight:400,color:"#939393",fontSize:"14.5px",letterSpacing:"0.14px",borderBottom:"1px solid #efefef",height:"80px",px:2,py:2}}>Employee Name</TableCell>
                        <TableCell sx={{ fontFamily:"Poppins, Helvetica",fontWeight:400,color:"#939393",fontSize:"14.5px",letterSpacing:"0.14px",borderBottom:"1px solid #efefef",height:"80px",px:2,py:2}}>Role</TableCell>
                        <TableCell sx={{ fontFamily:"Poppins, Helvetica",fontWeight:400,color:"#939393",fontSize:"14.5px",letterSpacing:"0.14px",borderBottom:"1px solid #efefef",height:"80px",px:2,py:2}}>Contact Information</TableCell>
                        <TableCell sx={{ fontFamily:"Poppins, Helvetica",fontWeight:400,color:"#939393",fontSize:"14.5px",letterSpacing:"0.14px",borderBottom:"1px solid #efefef",height:"80px",px:2,py:2}}>Key Performance Indicators</TableCell>
                        <TableCell sx={{ fontFamily:"Poppins, Helvetica",fontWeight:400,color:"#939393",fontSize:"14.5px",letterSpacing:"0.14px",borderBottom:"1px solid #efefef",height:"80px",px:2,py:2}}>Actions</TableCell>

            </TableRow>
            </TableHead>
            <TableBody>
                {employeesData.map((employee,index) => (
                    <TableRow 
                    key={employee.id} 
                    sx={{backgroundColor:index % 2 === 1 ? "#f9fbff" : "#ffffff",
                        "&:hover":{backgroundColor:index % 2 === 1 ? "#f0f5ff" : "#fafafa"},
                    }}
                    >
                    
            <TableCell sx={{color:"#151d48",fontSize:"14px",height:"64px",px:2,py:1,borderBottom:"none"}}> {employee.id} </TableCell>
            <TableCell sx={{color:"#151d48",fontSize:"14px",height:"64px",px:2,py:1,borderBottom:"none"}}> {employee.name} </TableCell>
            <TableCell sx={{color:"#151d48",fontSize:"14px",height:"64px",px:2,py:1,borderBottom:"none"}}> {employee.role} </TableCell>
            <TableCell sx={{color:"#151d48",fontSize:"14px",height:"64px",px:2,py:1,borderBottom:"none"}}> {employee.contact} </TableCell>
            <TableCell sx={{height:"64px",px:2,py:1,borderBottom:"none"}}/>
            <TableCell sx={{height:"64px",px:2,py:1,borderBottom:"none"}}>

                <Stack direction="row" spacing={2} alignItems="center">

                <IconButton size="small" sx={{padding:0, "&:hover":{backgroundColor:"transparent"},}}>
                    <img src={viewpic} alt="view" style ={{width:"24px",height:"24px"}}/>
                </IconButton>

                <IconButton size="small" sx={{padding:0, "&:hover":{backgroundColor:"transparent"}}} onClick={() => handleDelete(employee.id)}>
                     <img src={exitpic} alt="view" style ={{width:"24px",height:"24px"}}/>
                </IconButton>
  
                
                </Stack>
                </TableCell>
                </TableRow>
                ))}


            </TableBody>
            </Table>
            </TableContainer>
        </Box>
    );
};