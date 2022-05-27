import { schemaComposer } from "graphql-compose";
import { ScheduleTC, ScheduleModel} from "../../models/schedule";
import { SubjectTC, SubjectModel } from "../../models/subject";



export const createSchedule = ScheduleTC.getResolver('createOne');
export const updateSchedule = ScheduleTC.getResolver("updateById");
export const deleteScheduleId = ScheduleTC.getResolver("removeById");

const AddSchedulePayloadOTC = schemaComposer.createObjectTC({
    name: 'AddSchedulePayload',
    fields: {
      status: 'String!',
      message: 'String',
    },
  })

export const addSchedule = schemaComposer.createResolver({
  name: 'addSchedule',
  kind: 'mutation',
  type: AddSchedulePayloadOTC,
  args: {
      code: 'String!',
      userId: "String"
  },
  resolve: async ({args}) => {
    const { code, userId } = args
    const schedule = await ScheduleModel.findOne( { code : code } )
    if(!schedule){
        return {
            status: "fail",
            message: "code can't use"

        }
    }
    console.log("schedule : ")
    console.log(schedule)
    const subjects = await SubjectModel.find({ scheduleId: schedule._id})
    console.log("subjects : ")
    console.log(subjects)

    const createSchedule = await ScheduleModel.create({title: schedule.title, code: "5tdfg", userId: userId})
    return {
        status: "success",
        message: "schedule add complete"
    }
  }
})


