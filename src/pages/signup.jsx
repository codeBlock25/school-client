import React, { Component } from 'react';
import "../styles/account.css"
import { Button, TextField, FormControlLabel, Checkbox } from "@material-ui/core"
import { ArrowForward } from "@material-ui/icons"
import { withStyles } from "@material-ui/styles"
import { toast, ToastContainer } from 'react-toastify';
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import { ClipLoader } from 'react-spinners';

const styles = {
    textfield: {
        width: "100%",
        margin: "20px 0",
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
        backgroundColor: "#101010",
        color: "white",
        "&:hover": {
            backgroundColor: "#333"
        }
    }
}

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            email: "",
            loading: false,
            policy: false
        }
        this.handleCheckChange = this.handleCheckChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleCheckChange(){
        this.setState({policy: !this.state.policy})
    }
    handleChange(e){
        this.setState({[e.target.id]: e.target.value})
        document.querySelector("form .error").classList.remove("active")
    }
    async handleSubmit(e){
        e.preventDefault()
        console.log("hi")
        this.setState({loading: true})
        if (this.state.email === "") {
            this.setState({loading: false})
            console.log("hi 1")
            document.querySelector(".account form .error").classList.add("active")
            document.querySelector(".account form .error").innerHTML ="please provide your first name"
        } else if(this.state.password === ""){
            this.setState({loading: false})
            console.log("hi 2")
            document.querySelector(".account form .error").classList.add("active")
            document.querySelector(".account form .error").innerHTML ="please provide your password"
        } else if(this.state.policy === false){
            this.setState({loading: false})
            console.log("hi 3")
            document.querySelector(".account form .error").classList.add("active")
            document.querySelector(".account form .error").innerHTML ="please you need to agree on this"
        } else {
            document.querySelector(".account form .error").classList.remove("active")
            console.log("passed")
            console.log("hi 4")
            await Axios({
                url: "http://localhost:1100/api/account/login",
                method: "POST",
                data: {
                    email: this.state.email,
                    password: this.state.password,
                }
            }).then(data=>{
                toast.success(data.data.msg)
                localStorage.setItem("token", data.data.token)
                setTimeout(() => {
                    this.setState({loading: false})
                    if (data.data.type === "admin") {
                        this.props.history.push("/admin/dashboard")
                        localStorage.setItem("status", "admin")
                        console.log(data.data)
                    } else if(data.data.type === "staff") {
                        this.props.history.push("/dashboard")
                        localStorage.setItem("status", "staff")
                    } else {
                        this.props.history.push("/take")
                        localStorage.setItem("status", "student")
                    }
                }, 1500);
            }).catch(err=>{
                toast.error("communition with school server broken")
                setTimeout(() => {
                    this.setState({loading: false})
                }, 500);
                console.log(err)
            
            })
        }
    }
    // async componentDidMount(){
    //     let token = await localStorage.getItem("token")
    //     if (token !== null || token !== undefined || token !== [] || token !== {} || token !== "") {
    //         this.props.history.push("/dashboard")
    //     }
    // }
    render() {
        const { classes } = this.props
        return (
            <section className="account">
                <ToastContainer/>
                <div className="wrapper">
                    <h3>school login form</h3>
                    <form action="" onSubmit={this.handleSubmit}>
                        <div className="error">
                            error
                        </div>
                        <TextField
                            variant="outlined"
                            label="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classes.textfield}
                        />
                        <TextField
                            variant="outlined"
                            label="password"
                            id="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className={classes.textfield}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={this.state.policy} onChange={this.handleCheckChange} value="checkedA" />
                          }
                          label="remember me"
                          style={{display: "block"}}
                        />
                         <Button type="submit" className={classes.btn}>{this.state.loading? <ClipLoader color="white" size="25" sizeUnit="px" />: <span>login<ArrowForward style={{transform: "translate(30%, 23%)"}}/></span>}  </Button>
                   </form>
                </div>
            </section>
        )
    }
}

export default withStyles(styles)(Signup)