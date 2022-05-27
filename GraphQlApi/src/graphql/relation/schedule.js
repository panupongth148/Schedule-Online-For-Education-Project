import { ScheduleTC } from '../../models/schedule';
import { UserTC } from '../../models/user';
import { SubjectTC } from "../../models/subject";

ScheduleTC.addRelation(
    'user',
    {
        resolver: UserTC.getResolver('findById'),
        projection: {
            userId: 1
        },
        prepareArgs: {
            _id: (schedule) => schedule.userId,
        }
    }
)



ScheduleTC.addRelation(
    'subjects',
    {
        resolver: SubjectTC.getResolver('findMany'),
        projection: {
            _id: 1
        },
        prepareArgs: {
            filter: (subject) => ({
                scheduleId: subject._id,
              }),
        }
    }
)