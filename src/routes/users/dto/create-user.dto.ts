import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/[0-9a-zA-Z]{8,}/)
  @ApiProperty()
  password: string;
}
