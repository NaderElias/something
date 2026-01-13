import React, { useState, useEffect, type JSX } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_DEPARTMENT, UPDATE_DEPARTMENT } from "../../queries/department";
import { Button, Chip, Grid, Stack, Typography, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { department } from "../../interfaces/types";

//interfaces for the query
interface GetDepartmentData {
  department: department;
}

interface GetDepartmentVars {
  id: number;
}

interface UpdateDepartmentData {
  updateDepartment: {
    name: string;
    description: string;
    manager: string;
    location: string;
    code: number;
    status: boolean;
    localization: {
      name: string;
      description?: string;
    };
    parentDepartment?: {
      name: string;
    } | null;
    createdAt: string;
  };
}


export const DepartmentInfoSection = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false);

  // Fetch department
  const { data, loading, error } = useQuery<GetDepartmentData, GetDepartmentVars>(
    GET_DEPARTMENT,
    { variables: { id: 1 } } // placeholder id
  );

  const dept = data?.department;

  // Setup form with React Hook Form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: dept?.name ?? "",
      description: dept?.description ?? "",
      manager: dept?.manager ?? "",
      location: dept?.location ?? "",
      code: dept?.code ?? 0,
      status: dept?.status ?? false,
      localizationName: dept?.localization?.name ?? "",
      parentDepartmentName: dept?.parentDepartment?.name ?? "",
      createdAt: dept?.createdAt ? new Date(dept.createdAt).toISOString().slice(0, 16) : "",
    },
  });

  // Prefill form when entering edit mode
  useEffect(() => {
    if (editMode && dept) {
      reset({
        name: dept.name,
        description: dept.description,
        manager: dept.manager,
        location: dept.location,
        code: dept.code,
        status: dept.status,
        localizationName: dept.localization.name,
        parentDepartmentName: dept.parentDepartment?.name ?? "",
        createdAt: dept.createdAt ? new Date(dept.createdAt).toISOString().slice(0, 16) : "",
      });
    }
  }, [editMode, dept, reset]);

  // GraphQL update mutation
const [updateDepartment] = useMutation<UpdateDepartmentData>(UPDATE_DEPARTMENT, {
  onCompleted: (data) => {
    reset({
      name: data.updateDepartment.name,
      description: data.updateDepartment.description,
      manager: data.updateDepartment.manager,
      location: data.updateDepartment.location,
      code: data.updateDepartment.code,
      status: data.updateDepartment.status,
      localizationName: data.updateDepartment.localization.name,
      parentDepartmentName: data.updateDepartment.parentDepartment?.name ?? "",
      createdAt: data.updateDepartment.createdAt
        ? new Date(data.updateDepartment.createdAt).toISOString().slice(0, 16)
        : "",
    });
    setEditMode(false);
  },
  update: (cache, { data }) => {
    if (!data) return;

    cache.writeQuery({
      query: GET_DEPARTMENT,
      variables: { id: 1 }, // same ID as your query
      data: {
        department: data.updateDepartment,
      },
    });
  },
});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!dept) return <p>No department found</p>;

  // Fields mapping for rendering
  type DepartmentFieldName = "code" | "name" | "localizationName" | "parentDepartmentName" | "manager" | "location" | "status" | "createdAt" | "description";
  
  const departmentData: Array<{ label: string; name?: DepartmentFieldName; value?: unknown; type?: string; isWide?: boolean }> = [
    { label: "Department Code", name: "code" },
    { label: "Department Name (EN)", name: "name" },
    { label: "Department Name (AR)", name: "localizationName" },
    { label: "Parent Department", name: "parentDepartmentName" },
    { label: "Manager", name: "manager" },
    { label: "Location", name: "location" },
    { label: "Number of Employees", value: dept.employeesNumber },
    { label: "Status", name: "status", type: "checkbox" },
    { label: "Creation Date", name: "createdAt", type: "datetime-local" },
    { label: "Department Description", name: "description", isWide: true },
  ];

  return (
    <Stack spacing={3} className="animate-fade-in">
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            variant="h6"
            sx={{ fontFamily: "Poppins, Helvetica", fontWeight: 500, color: "#151d48", fontSize: 20 }}
          >
            {dept.name}
          </Typography>
          <Chip
            label={dept.status ? "Active" : "Inactive"}
            sx={{
              backgroundColor: "#16c09833",
              color: "#16c098",
              fontFamily: "Poppins,Helvetica",
              fontSize: 12,
              fontWeight: 400,
              height: "28px",
              borderRadius: "20px",
            }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              width: 140,
              textTransform: "none",
              fontFamily: "Poppins, Helvetica",
              fontWeight: 500,
              fontSize: 14,
              color: "#0F6BBC",
              borderColor: "#d1d1d1",
              backgroundColor: "#ffffff",
              "&:hover": { borderColor: "#0f6bbc", backgroundColor: "#f5f5f5" },
            }}
          >
            Export
          </Button>

          {editMode ? (
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleSubmit((formData) =>
                  updateDepartment({ variables: { updateData: formData } })
                )}
              >
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </Stack>
          ) : (
            <Button
              variant="contained"
              startIcon={<EditOutlinedIcon />}
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Fields */}
      <Grid container spacing={3}>
        {departmentData.map((field, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: field.isWide ? 6 : 3 }}>
            <Stack spacing={0.5}>
              <Typography
                sx={{ fontFamily: "Poppins,Helvetica", fontWeight: 400, fontSize: 12, color: "#6b7280", lineHeight: "20px" }}
              >
                {field.label}
              </Typography>

              {editMode && field.name ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: fieldProps }) => (
                    <TextField
                      {...fieldProps}
                      size="small"
                      fullWidth
                      type={field.type === "checkbox" ? "checkbox" : field.type || "text"}
                    />
                  )}
                />
              ) : (
                <Typography
                  sx={{
                    fontFamily: "Poppins,Helvetica",
                    fontWeight: 501,
                    fontSize: 14,
                    color: "#263238",
                    lineHeight: "20px",
                  }}
                >
                  {field.value !== undefined
                    ? String(field.value)
                    : field.name === "localizationName"
                    ? dept.localization.name
                    : field.name === "parentDepartmentName"
                    ? dept.parentDepartment?.name ?? ""
                    : field.name === "createdAt"
                    ? new Date(dept.createdAt).toLocaleString()
                    : String(dept[field.name as keyof typeof dept] ?? "")}
                </Typography>
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
