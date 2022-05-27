import { schemaComposer } from "graphql-compose";
import { ScheduleTC, ScheduleModel} from "../../models/schedule";
import { SubjectTC, SubjectModel } from "../../models/subject";
import { generateToken } from "../../lib/generateCode";


export const createSchedule = ScheduleTC.getResolver('createOne');
export const updateSchedule = ScheduleTC.getResolver("updateById");
export const deleteScheduleId = ScheduleTC.getResolver("removeById");

const AddSchedulePayloadOTC = schemaComposer.createObjectTC({
    name: 'AddSchedulePayload',
    fields: {
      status: 'String!',
      message: 'String',
      subjects: SubjectTC.getType(),
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
            message: "code can't use",

            
        }
    }
    // console.log("schedule : ")
    // console.log(schedule)
    const subjects = await SubjectModel.find({ scheduleId: schedule._id})
    // console.log("subjects : ")
    // console.log(subjects)
    const codeNew = generateToken();
    try{
      const createSchedule = await ScheduleModel.create({title: schedule.title, code: codeNew, userId: userId})
      console.log(createSchedule)


      // console.log(schedule._id.toString())
      subjects.map(async (subject)=>{
        const createSub = await SubjectModel.create({
          subjectName: subject.subjectName,
          date: subject.date,
          time: subject.time,
          link: subject.link,
          scheduleId: createSchedule._id.toString()
        })
        // console.log(createSub)
      })
      // for(let i = 0; i< subjects.length;i++){
      //   console.log("in loop")
      //   SubjectModel.create({
      //     subjectName: subjects[i].subjectName,
      //     date: subjects[i].date,
      //     time: subjects[i].time,
      //     link: subjects[i].link,
      //     scheduleId: schedule.scheduleId
      //   })
      // }
      // console.log(createSubject)
    return {
        status: "success",
        message: "schedule add complete"
    }
    }catch(err){
      return {
        status: "fail",
        message: "cannot add schedule"
    }
    }
    
  }
})


