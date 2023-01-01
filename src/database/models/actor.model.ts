import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Actor {
    @Prop()
    firstName: string

    @Prop()
    lastName: string
}

const ActorSchema = SchemaFactory.createForClass(Actor)

export { ActorSchema }