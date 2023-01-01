import { PersonEntity } from "./person.entity";

export class MovieEntity {
    constructor (
    public readonly name: string,
    public readonly year: number,
    public readonly genres: string[],
    public readonly ageLimit: number,
    public readonly rating: number,
    public readonly actors: PersonEntity[],
    public readonly director: PersonEntity,
    public readonly synopsis: string,
    ) {}

}