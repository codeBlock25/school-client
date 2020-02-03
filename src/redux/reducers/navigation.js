import { ADDSTAFF, ADDSTUDENT, SETEXAM } from "../types/navigation"

const initialState={
    add_staff_open: false,
    add_student_open: false,
    add_exam_open: false,
}

export const  navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDSTAFF: return {
            ...state,
            add_staff_open: !state.add_staff_open,
            add_student_open: false,
            add_exam_open: false
        }
        case ADDSTUDENT: return {
            ...state,
            add_staff_open: false,
            add_student_open: !state.add_student_open,
            add_exam_open: false
        }
        case SETEXAM: return {
            ...state,
            add_staff_open: false,
            add_student_open: false,
            add_exam_open: !state.add_exam_open 
        }
    
        default: return {...state}
    }
}