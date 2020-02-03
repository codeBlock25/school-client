import React, { Component } from 'react';
import "../styles/dashboard.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function SimpleTable(props) {
  const classes = useStyles();
  const { rows,type } = props

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label={type}>
        <TableHead>
          <TableRow>
            <TableCell>Names</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                rows ? 
                rows.map(row => (
                  <TableRow key={row.email}>
                    <TableCell component="th" scope="row">
                      {`${row.first_name} ${row.last_name}`}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                  </TableRow>
                ))
                : ""
            }
        </TableBody>
      </Table>
    </TableContainer>
  )}


class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: undefined
        }
    }
    async componentDidMount(){
      //   let status = await localStorage.getItem("status")
      //   if (this.props.location.pathname === "/register" || this.props.location.pathname === "/login") {
      //     return null
      // } else if (status === "staff") {
      //       this.props.history.push("/dashboard")
      //   } else if (status === "student") {
      //       this.props.history.push("/take")
      //   } else {
      //       let token = await localStorage.getItem("token")
      //       Axios({
      //           url: `http://localhost:1100/api/use/${token}`,
      //           method: "GET"
      //       }).then(data=>{
      //           this.setState({data: data.data})
      //       })
      //       .catch((err)=>{
      //           console.log(err)
      //       })
      //   }
    }
    render() {
        return (
            <section className="Dashboard">
                <div className="wrapper">
                    <div className="dashInfo">
                        <div className="infoTab" style={{width: "calc(100% / 2 - 10px"}}
                          onClick={()=>{
                            document.querySelector(".tab.first").style.opacity = 1
                            document.querySelector(".tab.second").style.opacity = 0
                          }}
                        >
                            <span className="count">{this.state.data ? this.state.data.student.length: 0}</span>
                            <span className="title">students</span>
                        </div>
                        <div className="infoTab" style={{width: "calc(100% / 2 - 10px"}}
                          onClick={()=>{
                            document.querySelector(".tab.first").style.opacity = 0
                            document.querySelector(".tab.second").style.opacity = 1
                          }}
                        >
                            <span className="count">{this.state.data ? this.state.data.staff.length: 0}</span>
                            <span className="title">staff</span>
                        </div>
                    </div><div className="container">
                        <div className="tab first" style={{opacity: 1}}>
                          <h3>Students</h3>
                            <SimpleTable rows={this.state.data ? this.state.data.student : undefined} type="students"/>
                        </div>
                        <div className="tab second">
                          <h3>Staffs</h3>
                            <SimpleTable rows={this.state.data ? this.state.data.staff : undefined} type="staff"/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default AdminDashboard 