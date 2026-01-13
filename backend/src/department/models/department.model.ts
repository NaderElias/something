// Models for the Inputs and what not

import { ObjectType, InputType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Localization {
  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class Employee {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  contact: string;
}

@ObjectType()
export class ParentDepartment {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class Department {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Localization)
  localization: Localization;

  @Field(() => ID)
  code: number;

  @Field()
  manager: string;

  @Field()
  location: string;

  @Field()
  employeesNumber: number;

  @Field()
  status: boolean;

  @Field(() => ParentDepartment, { nullable: true })
  parentDepartment?: ParentDepartment;

  @Field()
  createdAt: string;

  @Field(() => [Employee])
  employees: Employee[];
}

@InputType()
export class UpdateDepartmentInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  manager: string;

  @Field()
  location: string;

  @Field(() => ID)
  code: number;

  @Field()
  status: boolean;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  parentDepartmentName?: string;

  @Field({ nullable: true })
  localizationName?: string;

  @Field({ nullable: true })
  localizationDescription?: string;
}
