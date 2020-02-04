import React, { Component } from 'react';
import "../styles/add.css"
import { TextField, Button, Fab } from "@material-ui/core"
import  { withStyles } from "@material-ui/styles"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Axios from "axios"
import { ArrowForward, Clear, Fingerprint } from '@material-ui/icons';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { setExamAction, addStudentAction, addStaffAction } from '../redux/actions/navigation';
// import { FingerprintReader } from '@digitalpersona/devices'


const styles = {
    textfield: {
        width: "100%",
        margin: "5px 0",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "rgb(245, 0, 87)",
            fontSize: "15px"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#a8a8a8"
        }
    },
    btn: {
        width: "50%",
        minWidth: "200px",
        height: "50px",
        margin: "20px 0 0 0",
        backgroundColor: "#101010",
        color: "white",
        "&:hover": {
            backgroundColor: "#333"
        }
    },
    clear: {
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)"
    }
}

// class FingerprintSigninControl
// {
//     init() {
//         this.reader = new FingerprintReader();
//         this.reader.on("DeviceConnected", this.onDeviceConnected);
//         this.reader.on("DeviceDisconnected", this.onDeviceDisconnected);
//         this.reader.on("QualityReported", this.onQualityReported);
//         this.reader.on("SamplesAcquired", this.onSamplesAcquired);
//         this.reader.on("ErrorOccurred", this.onReaderError);
        
//     }
    
//     // Event handlers.
//     onDeviceConnected    = (event) => { console.log(event) }
//     onDeviceDisconnected = (event) => { console.log(event) };
//     onQualityReported    = (event) => { console.log(event) };
//     onSamplesAcquired    = (event) => { console.log(event) };
//     onReaderError        = (event) => { console.log(event) };
// }

// class FingerprintSigninControl
// {

//     destroy() {
//         this.reader.off();
//         delete this.reader;
//     }
// }

// class CardsSigninControl extends CardsReader
// {
//      reader
// }
// class CardsSigninControl
// {
//     init() {
//         this.reader = new CardsReader();
//         this.reader.on("DeviceConnected", this.onDeviceConnected);
//         this.reader.on("DeviceDisconnected", this.onDeviceDisconnected);
//         this.reader.on("CardInserted", this.onCardInserted);
//         this.reader.on("CardRemoved", this.onCardRemoved);
        
//     }
    
//     // Event handlers.
//     onDeviceConnected    = (event) => { console.log(event) }
//     onDeviceDisconnected = (event) => { console.log(event) };
//     onCardInserted       = (event) => { console.log(event) };
//     onCardRemoved        = (event) => { console.log(event) };
// }
// class CardsSigninControl
// {
//      init() {
//         try {
//             await this.reader.subscribe();
//         } catch (error) {
//             this.handleError(error);
//         }
//     }
// }

class Add extends Component {
    constructor(props) {
    super(props)
    this.state = {
        first_name: "",
        last_name: "",
        email: "",
        class: '',
        loading: false,
        policy: false,
        done: false
    }
    // this.reader = this.reader.bind(this)
    this.handleCheckChange = this.handleCheckChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitStudent = this.handleSubmitStudent.bind(this)
    this.handleFingerPrint = this.handleFingerPrint.bind(this)
}

// componentDidMount(){
//     onSamplesAcquired =async (event) =>
//     {
//         try {
//             const samples = event.samples;
//             const api = new FingerprintsAuth();
//             const token = await (
//                 this.identity ? 
//                     api.authenticate(this.identity, samples):
//                     api.identify(samples)
//             )
//             this.notifyOnToken(token);
//         }
//         catch (error) {
//             this.handleError(error);
//         }
//     }
// }

handleCheckChange(){
    this.setState({policy: !this.state.policy})
}
handleChange(e){
    this.setState({[e.target.id]: e.target.value})
    document.querySelector("form .error").classList.remove("active")
}
async handleSubmit(e){
    e.preventDefault()
    let token = await localStorage.getItem("token")
    this.setState({loading: true})
    if (this.state.first_name === "") {
        this.setState({loading: false})
        document.querySelector("form .error").classList.add("active")
        document.querySelector("form .error").innerHTML ="please provide your first name"
    } else if(this.state.last_name === ""){
        this.setState({loading: false})
        document.querySelector("form .error").classList.add("active")
        document.querySelector("form .error").innerHTML ="please provide your last name"
    } else if(this.state.email === ""){
        this.setState({loading: false})
        document.querySelector("form .error").classList.add("active")
        document.querySelector("form .error").innerHTML ="please provide your email"
    } else {
        document.querySelector("form .error").classList.remove("active")
        console.log("passed")
        await Axios({
            url: "http://localhost:1100/api/admin/add",
            method: "POST",
            data: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                token: token
            }
        }).then(()=>{
            toast.success("new staff added ")
            setTimeout(() => {
                this.setState({loading: false})
                if (this.props.isAddStaff) {
                    this.props.addStaff()
                } else if (this.props.isAddStudent) {
                    this.props.addStudent()
                } else {
                    
                }
            }, 1500);
        }).catch(err=>{
            toast.error("communition with school server broken")
            setTimeout(() => {
                this.setState({loading: false})
            }, 1500);
            console.log(err)
        })
    }
}
async handleSubmitStudent(e){
    e.preventDefault()
    this.setState({loading: true})
    if (this.state.first_name === "") {
        this.setState({loading: false})
        document.querySelector("form .error").classList.add("active")
        document.querySelector("form .error").innerHTML ="please provide your first name"
    } else if(this.state.last_name === ""){
        this.setState({loading: false})
        document.querySelector("form .error").classList.add("active")
        document.querySelector("form .error").innerHTML ="please provide your last name"
    } else if(this.state.email === ""){
        this.setState({loading: false})
        document.querySelector("form .error").classList.add("active")
        document.querySelector("form .error").innerHTML ="please provide your email"
    }else if(this.state.class === ""){
        this.setState({loading: false})
        document.querySelector("form .error").classList.add("active")
        document.querySelector("form .error").innerHTML ="please provide a class"
    } else {
        this.setState({loading: false})
        document.querySelector(".add_user .print").classList.add("ing")
        document.querySelector(".add_user .wrapper").classList.add("out")
        
    }

}
async handleFingerPrint(){
    let token = localStorage.getItem("token")
    console.log(token)
    document.querySelector("form .error").classList.remove("active")
    await Axios({
        url: "http://localhost:1100/api/admin/student",
        method: "POST",
        data: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            classS: this.state.class,
            token: token
        }
    }).then(()=>{
        toast.success("new student added")
        setTimeout(() => {
            this.setState({loading: false})
            if (this.props.isAddStaff) {
                this.props.addStaff()
            } else if (this.props.isAddStudent) {
                this.props.addStudent()
            } else {
                
            }
        }, 1500);
    }).catch(err=>{
        toast.error("bad query")
        setTimeout(() => {
            this.setState({loading: false})
        }, 1500);
        console.log(err)  
    })
}
    render() {
        const { classes } = this.props
        return (
            <div className={this.props.isAddStaff || this.props.isAddStudent ? "add_user open": "add_user"}>
                <ToastContainer position="bottom-center"/>
                <div className="print">
                    <Fab className={classes.clear}
                        onClick={()=>{
                            if (this.props.isAddStaff) {
                                this.props.addStaff()
                            } else if (this.props.isAddStudent) {
                                this.props.addStudent()
                            } else {
                                
                            }
                        }}
                    >
                        <Clear/>
                    </Fab>
                    <Fingerprint className="fp" onClick={this.handleFingerPrint}/>
                    <span className="txt">add student finger prints, tap to scan</span>
                </div>
                <div className="wrapper">
                    <Fab className={classes.clear}
                        onClick={()=>{
                            if (this.props.isAddStaff) {
                                this.props.addStaff()
                            } else if (this.props.isAddStudent) {
                                this.props.addStudent()
                            } else {
                                
                            }
                        }}
                    >
                        <Clear/>
                    </Fab>
                    <h3> {this.state.isAddStaff? "staff": this.props.isAddStudent? "student": "staff"} register form</h3>
                    <form action="" onSubmit={this.props.isAddStudent ? this.handleSubmitStudent : this.handleSubmit}>
                        <div className="error">
                            error
                        </div>
                        <TextField
                            variant="outlined"
                            label="First Name"
                            id="first_name"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                            className={classes.textfield}
                        />
                        <TextField
                            variant="outlined"
                            label="Last Name"
                            id="last_name"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                            className={classes.textfield}
                        />
                        <TextField
                            variant="outlined"
                            label="Email"
                            type="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classes.textfield}
                        /> 
                        {this.props.isAddStudent? 
                            <select id="class" value={this.state.class} onChange={this.handleChange}>
                                <option value="">select a class</option>
                                <option value="100 level">100 level</option>
                                <option value="200 level">200 level</option>
                                <option value="300 level">300 level</option>
                                <option value="400 level">400 level</option>
                                <option value="500 level">500 level</option>
                                <option value="600 level">600 level</option>
                            </select>: ""
                        }
                        <Button type="submit" className={classes.btn}>{this.state.loading? <ClipLoader color="white" size="25" sizeUnit="px" />: <span>add<ArrowForward style={{transform: "translate(30%, 23%)"}}/></span>}  </Button>
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
            document.querySelector(".add_user .print").classList.remove("ing")
            document.querySelector(".add_user .wrapper").classList.remove("out")
        
        },
        setExam: () => {
            dispatch(setExamAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Add))