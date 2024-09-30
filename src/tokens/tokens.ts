import { ApiProperty } from "@nestjs/swagger";

export class Tokens {
  @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', description: 'Access токе'})
  readonly accessToken: string;

  @ApiProperty({example: 'wicGFzc3dvcmQiOiIkMmEkMDUkb0tMU', description: 'Refresh токен'})
  readonly refreshToken: string;
}