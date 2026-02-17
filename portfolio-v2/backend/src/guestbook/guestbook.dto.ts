import { IsNotEmpty, IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class CreateGuestbookDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  @MinLength(3)
  @MaxLength(500)
  message: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  emoji?: string; // optional mood emoji the user picks
}

export class UpdateGuestbookDto {
  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  @MinLength(3)
  @MaxLength(500)
  message: string;
}
