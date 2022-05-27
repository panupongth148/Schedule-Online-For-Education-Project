import {SubjectTC} from "../../models/subject"

export const createSubject = SubjectTC.getResolver("createOne");
export const updateSubjectById = SubjectTC.getResolver("updateById");
export const deleteSubjectById = SubjectTC.getResolver("removeById");