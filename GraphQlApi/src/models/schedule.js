import { composeWithMongoose } from 'graphql-compose-mongoose';
import { model, Schema } from 'mongoose';

const ScheduleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

});

export const ScheduleModel = model('Schedule', ScheduleSchema);

export const ScheduleTC = composeWithMongoose(ScheduleModel);