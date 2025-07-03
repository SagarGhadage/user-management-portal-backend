import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true }) firstName: string;
    @Prop({ required: true }) lastName: string;
    @Prop({ required: true, unique: true }) email: string;
    @Prop({ required: true }) password: string;
    @Prop({ required: true, enum: ['Admin', 'User', 'Manager'] }) role: 'Admin' | 'User' | 'Manager';
    @Prop({ default: 'Registered' }) status: string;
    @Prop({ required: true }) otp: string;
    @Prop({ default: Date.now }) createdAt: Date;
}
export enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Manager = 'Manager'
}
export const UserSchema = SchemaFactory.createForClass(User);