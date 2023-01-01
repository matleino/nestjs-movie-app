
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { PersonDto } from "./person.dto"

export class CreateUpdateMovieDto {
    @IsString()
    name: string
    
    @IsNumber()
    year: number

    @IsArray()
    @IsString({ each: true })
    genres: string[]

    @IsNumber()
    ageLimit: number
    
    @IsNumber()
    rating: number

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PersonDto)
    actors: PersonDto[]

    @IsNotEmpty()
    director: PersonDto

    @IsString()
    synopsis: string
}