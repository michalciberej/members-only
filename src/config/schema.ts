import mongoose, { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: Schema.ObjectId, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permision: {
    type: String,
    default: 'member',
    enum: ['admin', 'member'],
  },
  messages: [{ type: Schema.ObjectId, ref: 'Message' }],
});

const messageSchema = new Schema({
  _id: { type: Schema.ObjectId, required: true },
  postedBy: { type: Schema.ObjectId, required: true, ref: 'User' },
  postedOn: { type: Date, required: true },
  body: { type: String, required: true },
});

export type UserType = InferSchemaType<typeof userSchema>;
export type MessageType = InferSchemaType<typeof messageSchema>;

export const User = mongoose.model('User', userSchema);
export const Message = mongoose.model('Message', messageSchema);

declare global {
  namespace Express {
    interface User extends UserType {}
  }
}
