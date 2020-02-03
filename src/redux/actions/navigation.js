import { ADDSTAFF, ADDSTUDENT, SETEXAM} from "../types/navigation"


export const addStaffAction = () => {
    return {
        type: ADDSTAFF,
    }
}
export const addStudentAction = () => {
    return {
        type: ADDSTUDENT,
    }
}
export const setExamAction = () => {
    return {
        type: SETEXAM,
    }
}