/** Entidad, schema o modelo de un objeto */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserModel extends Document {
    /** Collection's name: usermodels */
    @Prop({ required: true, type: String, unique: true })
    dni: string;

    @Prop({ required: true, type: String })
    clave: string;

    @Prop({ required: true, type: String })
    username: string;

    @Prop({ required: true, type: String, unique: true })
    accountNumber: string;

    @Prop({ required: true, type: String })
    accountCurrency: string;

    @Prop({ type: Number })
    balance: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
