import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Department, UpdateDepartmentInput } from './models/department.model';
import { Int } from '@nestjs/graphql/dist/scalars';
import { Args } from '@nestjs/graphql/dist/decorators/args.decorator';

// load the json as in static data
const filePath = path.join(__dirname, '../../src/department/department.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(rawData) as { department: Department };
@Injectable()
export class DepartmentService {
  private departmentData: Department;

  constructor() {
    this.departmentData = data.department;
  }

  // department info function
  getDepartmentInfo(id: number): Department {
    console.log(id);
    // your JSON only has one department
    return this.departmentData;
  }

  // delete employee function
  deleteEmployee(@Args('id', { type: () => Int }) id: number): boolean {
    //make sure the id is actually a number and not just string
    const employeeId = Number(id);
    //check if it's there
    const index = this.departmentData.employees.findIndex(
      (e) => e.id === employeeId,
    );
    //return if not there
    if (index === -1) return false;

    // remove employee
    this.departmentData.employees.splice(index, 1);

    // read the current JSON from disk
    const fileData = data;

    // update only the employees array
    fileData.department.employees = this.departmentData.employees;

    // write back the updated employees array
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');

    return true;
  }

  updateDepartment(updateData: UpdateDepartmentInput): Department {
    // Update main fields
    this.departmentData.name = updateData.name;
    this.departmentData.description = updateData.description;
    this.departmentData.manager = updateData.manager;
    this.departmentData.location = updateData.location;
    this.departmentData.code = updateData.code;
    this.departmentData.status = updateData.status;

    // createdAt
    if (updateData.createdAt) {
      this.departmentData.createdAt = updateData.createdAt;
    }

    // Parent department
    if (updateData.parentDepartmentName) {
      this.departmentData.parentDepartment = {
        id: 0, // since JSON has no id, placeholder
        name: updateData.parentDepartmentName,
      };
    }

    // Localization
    if (!this.departmentData.localization)
      this.departmentData.localization = { name: '', description: '' };
    if (updateData.localizationName)
      this.departmentData.localization.name = updateData.localizationName;
    if (updateData.localizationDescription)
      this.departmentData.localization.description =
        updateData.localizationDescription;

    // Save back to JSON
    data.department = this.departmentData;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return this.departmentData;
  }
}
