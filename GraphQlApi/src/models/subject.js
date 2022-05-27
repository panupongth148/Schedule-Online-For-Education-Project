import { composeWithMongoose } from 'graphql-compose-mongoose';
import { model, Schema } from 'mongoose';
import mongooseBcrypt from 'mongoose-bcrypt';

const SubjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
        trim: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    scheduleId: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true,
        index: true,
    }

});
SubjectSchema.plugin(mongooseBcrypt);

export const SubjectModel = model('Subject', SubjectSchema);

export const SubjectTC = composeWithMongoose(SubjectModel);