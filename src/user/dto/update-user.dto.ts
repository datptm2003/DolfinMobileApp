import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    job:string;

    @ApiProperty()
    income:string;

    @ApiProperty()
    year:string;
    
    status:number
}