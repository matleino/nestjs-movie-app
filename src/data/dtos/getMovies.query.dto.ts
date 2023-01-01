import { IsOptional, IsString } from "class-validator";

export class GetMoviesQueryDto {
    @IsOptional()
    @IsString()
    name: string
}