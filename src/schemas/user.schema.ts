import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class User {
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({ default: null })
    refresh_token: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ default: 1 })
    status: number;
}

export const UserSchema = SchemaFactory.createForClass(User)