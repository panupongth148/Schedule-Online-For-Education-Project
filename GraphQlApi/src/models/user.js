import { composeWithMongoose } from 'graphql-compose-mongoose';
import { model, Schema } from 'mongoose';
import mongooseBcrypt from 'mongoose-bcrypt';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        bcrypt: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    }
});
UserSchema.plugin(mongooseBcrypt);

export const UserModel = model('User', UserSchema);

export const UserTC = composeWithMongoose(UserModel);