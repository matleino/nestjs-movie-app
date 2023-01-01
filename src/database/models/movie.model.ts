import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { Actor, ActorSchema } from "./actor.model";

export type MovieDocument = Model<Movie>

@Schema()
export class Movie extends Document {
    @Prop()
    name: string

    @Prop()
    year: number

    @Prop({ default: [] })
    genres: string[]

    @Prop()
    ageLimit: number

    @Prop()
    rating: number

    @Prop({ type: [ActorSchema], default: [] })
    actors: Actor[]

    @Prop({ type: ActorSchema })
    director: Actor

    @Prop()
    synopsis: string
}

export const MovieSchema = SchemaFactory.createForClass(Movie)