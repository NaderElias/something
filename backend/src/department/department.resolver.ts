import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department, UpdateDepartmentInput } from './models/department.model';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  //department info API
  @Query(() => Department)
  department(@Args('id', { type: () => ID }) id: number): Department {
    return this.departmentService.getDepartmentInfo(id);
  }

  // delete employee API
  @Mutation(() => Boolean)
  deleteEmployee(@Args('id', { type: () => ID }) id: number): boolean {
    return this.departmentService.deleteEmployee(id);
  }
  // update department API
  @Mutation(() => Department)
  updateDepartment(
    @Args('updateData') updateData: UpdateDepartmentInput,
  ): Department {
    return this.departmentService.updateDepartment(updateData);
  }
}
