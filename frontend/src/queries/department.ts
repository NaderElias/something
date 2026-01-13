// src/queries/department.ts
import { gql } from '@apollo/client';

// department info query
export const GET_DEPARTMENT = gql`
query GetDepartment($id: ID!) {
  department(id: $id) {
    name
    description
    localization {
      name
      description
    }
    code
    manager
    location
    employeesNumber
    status
    parentDepartment {
      id
      name
    }
    createdAt
    employees {
      id
      name
      role
      contact
    }
  }
}

`;

// delete employee mutation
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

// update department mutation
export const UPDATE_DEPARTMENT = gql`
mutation UpdateDepartment($updateData: UpdateDepartmentInput!) {
  updateDepartment(updateData: $updateData) {
    name
    description
    manager
    location
    code
    status
    createdAt
    parentDepartment {
      name
    }
    localization {
      name
      description
    }
  }
}
`;

