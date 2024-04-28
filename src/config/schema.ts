import mongoose, { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  messages: { type: [mongoose.Types.ObjectId], required: true },
});

const messageSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  postedBy: { type: mongoose.Types.ObjectId, required: true },
  postedOn: { type: Date, required: true },
  body: { type: String, required: true },
});

export type UserType = InferSchemaType<typeof userSchema>;
export type MessageType = InferSchemaType<typeof messageSchema>;

export const User = mongoose.model('User', userSchema);
export const Message = mongoose.model('Message', messageSchema);
