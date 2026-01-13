import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';

@Module({
  providers: [DepartmentService, DepartmentResolver],
})
export class DepartmentModule {}
