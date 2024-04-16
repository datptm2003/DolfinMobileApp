import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class User {
    
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User)