import { ObjectTypeComposer, SchemaComposer, schemaComposer } from "graphql-compose";
import { ScheduleModel, ScheduleTC } from "../../models/schedule";

export const schedules = ScheduleTC.getResolver('findMany');
export const scheduleId = ScheduleTC.getResolver('findById');

const SchedulePayloadOTC = schemaComposer.createObjectTC({
    name: "SchedulePayloadOTC",
    fields: {
        status: "String!",
        message: "String!",
        Schedules: [ScheduleTC],
    },
});

export const schedulesByUserId = schemaComposer.createResolver({
    name: "schedulesByUserId",
    kind: "query",
    type: SchedulePayloadOTC,
    args: {
        userId: "String!"
    },
    resolve: async ({ args }) => {
        const { userId } = args;
        const schedule = await ScheduleModel.find({ userId: userId });
        console.log(schedule)
        
        if (!schedule) {
            return {
                status: "fail",
                message: "not have",
                Schedule: null
            }
        }
        console.log(schedule)
        return {
            status: "success",
            message: "have",
            Schedule: schedule
        }
    }
})