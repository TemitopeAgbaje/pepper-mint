import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, enum: ['active', 'inactive'] })
  status: string;

  @Prop({ default: Date.now })
  registeredAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
