import React, { Component } from 'react';
import "../styles/dashboard2.css"
import { SimpleTable } from "./admin_dashboard"

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            data: undefined
        }
    }
    handleDropDown =async (e)=> {
        if(e.currentTarget.lastElementChild.className === "drop") {
            e.currentTarget.lastElementChild.classList.add("ed")
            console.log("h")
        }else {
            e.currentTarget.lastElementChild.classList.remove("ed")
            console.log("y")
        }
    }
    async componentDidMount(){
        // let status = await localStorage.getItem("status")
        // if (this.props.location.pathname === "/register" || this.props.location.pathname === "/login") {
        //     return null
        // } else if (status === "admin") {
        //     this.props.history.push("/admin/dashboard")
        // } else if(status === "staff") {
        //     this.props.history.push("/dashboard")
        //     let token = await localStorage.getItem("token")
        //     Axios({
        //         url: `http://localhost:1100/api/use/${token}`,
        //         method: "GET"
        //     }).then(data=>{
        //         this.setState({data: data.data})
        //         console.log(this.state)
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
        // } else{
        //     // this.props.history.push("/take")
        // } 
    }
    render() {
        // const { classes } = this.props
        return (
            <section className="Dashboard">
            <div className="wrapper">
                <div className="infoTab">
                    <span className="count">{this.state.data ? this.state.data.student.length: 0}</span>
                    <span className="title">students</span>
                </div>

                    <SimpleTable rows={this.state.data ? this.state.data.student : undefined} type="students"/>
                </div>
            </section>
        )
    }
}

export default Dashboard