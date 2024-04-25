export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  total_blood: number;
  confirmPassword: string;
  roles: number[];
}
