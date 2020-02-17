import React, { Component } from 'react';
import { Person, MenuBook, PermContactCalendar, ExitToApp } from '@material-ui/icons';
import "../styles/header.css"
import { addStaffAction, addStudentAction, setExamAction } from '../redux/actions/navigation';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import { StuffAction } from '../redux/actions/stuff';


class Header extends Component {
    constructor(props) {
        super(props) 
        this.state={
            status: "staff"
        }
    }
     componentDidMount(){
         this.props.setStatus(localStorage.getItem("status"))
    }
    render() {
        return (
            <header style={
                this.props.location.pathname === "/register" || this.props.location.pathname === "/login" || this.props.location.pathname === "/question" || this.props.status === "student" ?{display: "none"}
                : {display: "flex"}
            }>
                <h2 className="title">{this.props.status}</h2>
                <ul>
                    {
                        this.props.status === "staff" ? 
                    <li onClick={this.props.setExam}><MenuBook/> Set question</li>
                    :""}
                    <li onClick={this.props.addStudent}><Person/> Add student</li>
                    {
                        this.props.status === "admin" ? 
                        <li onClick={this.props.addStaff}><PermContactCalendar/> Add staff</li>
                        : ""
                    }
                    <li onClick={()=>{
                        localStorage.setItem("token", [])
                        localStorage.setItem("status", [])
                        this.props.history.push("/login")
                        }}><ExitToApp/> logout</li>
                </ul>
            </header>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAddStaff: state.nav.add_staff_open,
        isAddStudent: state.nav.add_student_open,
        isExamStaff: state.nav.add_exam_open,
        status: state.setting.status
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addStaff: () => {
            dispatch(addStaffAction())
        },
        addStudent: () => {
            dispatch(addStudentAction())
        },
        setExam: () => {
            dispatch(setExamAction())
        },
        setStatus: (payload)=>{
            dispatch(StuffAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))