import React, { Component } from 'react';
import "../styles/question.css"
import { TextField, Button } from '@material-ui/core'
import  { withStyles } from "@material-ui/styles"
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import { addStaffAction, addStudentAction, setExamAction } from '../redux/actions/navigation';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios';

const styles = {
    textfield: {
        width: "100%",
        heigth: "40px ",
        margin: "10px 0",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "rgb(245, 0, 87)",
            fontSize: "15px"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#a8a8a8"
        }
    },
    btn: {
        width: "45%",
        minWidth: "200px",
        height: "50px",
        backgroundColor: "#101010",
        color: "white",
        margin: "20px 2%",
        "&:hover": {
            backgroundColor: "#333"
        }
    }
}
class Question extends Component {
    constructor(props){
        super(props)
        this.state = {
            class: "",
            date: "2020-01-20",
            type: "",
            classS: "",
            questions: [],
            question: "",
            firstOption: "",
            secondOption: "",
            thirdOption: "",
            fouthOption: "",
            answer: "",
            questionTargetCount: 10
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }
    handleChange(e){
        this.setState({[e.target.id]: e.target.value})
    }
    async handleSumbit(e){
        e.preventDefault()
        let token = await localStorage.getItem("token")
        if(this.state.classS === "" ||  this.state.date === "" || this.state.type === "" || this.state.questionTargetCount === 0 || this.state.questionTargetCount === "") {
            toast.error("please provide a class, type and date for you set of question")
        } else {

             if (document.querySelector(".setters").className === "setters set" && this.state.questions.length <= this.state.questionTargetCount ){
                if (
                    this.state.answer !== "" &&
                    this.state.question !== "" &&
                    this.state.firstOption !== "" && 
                    this.state.secondOption !== "" && 
                    this.state.thirdOption !== "" && 
                    this.state.fouthOption !== ""
                ) {
                    this.setState({questions: [
                        ...this.state.questions, 
                        {   question: this.state.question, 
                            answer: this.state.answer, 
                            firstOption: this.state.firstOption, 
                            secondOption: this.state.secondOption, 
                            thirdOption: this.state.thirdOption, 
                            fouthOption: this.state.fouthOption
                        }]
                    }, ()=>{
                        this.setState({
                            question: "",
                            firstOption: "",
                            secondOption: "",
                            thirdOption: "",
                            fouthOption: "",
                            answer: "",
                        })
                    })
                    
                } else {
                    toast.error("please fill all the fields")
                }
            }
            if(this.state.questions.length >=  this.state.questionTargetCount){
                await Axios({
                    method: "POST",
                    url: "http://localhost:1100/api/questions/set",
                    data: {
                        token: token,
                        question_type: this.state.type,
                        questions: this.state.questions,
                        classFor: this.state.classS
                    }
                }).then(()=>{
                    toast.success(`${this.state.type} set`)
                }).catch((err)=>{
                    toast.error("an error occured")
                    console.log(err)
                })
            }
            document.querySelector(".setters").classList.add("set")
            document.querySelector(".questionair").classList.add("quest")
        }
        
    }
    render() {
        const { classes } = this.props
        return (
            <div className={this.props.isExamStaff ? "Question open":"Question"}>
                <ToastContainer position="bottom-center"/>
                <div className="wrapper">
                    <h3>school register form</h3>
                    <form action="" onSubmit={this.handleSumbit}>
                       <div className="container"> 
                            <div className="setters">
                                <select id="classS" value={this.state.classS} onChange={this.handleChange}>
                                    <option value="">select a class</option>
                                    <option value="100 level">100 level</option>
                                    <option value="200 level">200 level</option>
                                    <option value="300 level">300 level</option>
                                    <option value="400 level">400 level</option>
                                    <option value="500 level">500 level</option>
                                    <option value="600 level">600 level</option>
                                </select>
                                <select id="type" value={this.state.type} onChange={this.handleChange}>
                                    <option value="">select a type</option>
                                    <option value="exam">exam</option>
                                    <option value="text">text</option>
                                </select>
                                <TextField
                                    id="date"
                                    label="time or exam"
                                    type="date"
                                    value={this.state.date}
                                    className={classes.textfield}
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />    
                                <TextField 
                                    id="questionTargetCount"
                                    label="question count"
                                    value={this.state.questionTargetCount}
                                    onChange={this.handleChange}
                                    className={classes.textfield}
                                    type="number"
                                />
                            </div>
                            <div className="questionair">
                                <span className="count">{this.state.questions.length} Question(s) added {this.state.questionTargetCount - this.state.questions.length} to go before you can set this as a full question </span>
                                <TextField
                                    onChange={this.handleChange}
                                    className={classes.textfield}
                                    label="question"
                                    id="question"
                                    multiline={true}
                                    variant="filled"
                                    value={this.state.question}
                                />
                                <hr/>
                                <TextField
                                    onChange={this.handleChange}
                                    className={classes.textfield}
                                    label="answer (a)"
                                    variant="standard"
                                    placeholder="first option"
                                    id="firstOption"
                                    value={this.state.firstOption}
                                />
                                <TextField
                                    onChange={this.handleChange}
                                    className={classes.textfield}
                                    label="answer (b)"
                                    variant="standard"
                                    placeholder="second option"
                                    id="secondOption"
                                    value={this.state.secondOption}
                                />
                                <TextField
                                    onChange={this.handleChange}
                                    className={classes.textfield}
                                    label="answer (c)"
                                    variant="standard"
                                    placeholder="third option"
                                    id="thirdOption"
                                    value={this.state.thirdOption}
                                />
                                <TextField
                                    onChange={this.handleChange}
                                    className={classes.textfield}
                                    label="answer (d)"
                                    variant="standard"
                                    placeholder="fouth option"
                                    id="fouthOption"
                                    value={this.state.fouthOption}
                                />
                                <select id="answer" value={this.state.answer} onChange={this.handleChange}>
                                    <option value="">select the answer</option>
                                    <option value="a">a</option>
                                    <option value="b">b</option>
                                    <option value="c">c</option>
                                    <option value="d">d</option>
                                </select>
                            </div>
                        </div>
                        <Button onClick={()=> {
                            if(this.props.isExamStaff){
                                this.props.setExam()
                            }
                        }} className={classes.btn}> <ArrowBack/> cancel</Button>
                        <Button type="submit" className={classes.btn}>{this.state.questions.length >= this.state.questionTargetCount ?"add": "set"} <ArrowForward/></Button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isAddStaff: state.nav.add_staff_open,
        isAddStudent: state.nav.add_student_open,
        isExamStaff: state.nav.add_exam_open
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
            document.querySelector(".setters").classList.remove("set")
            document.querySelector(".questionair").classList.remove("quest")
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Question))