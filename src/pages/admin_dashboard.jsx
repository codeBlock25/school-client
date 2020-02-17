import React, { Component } from 'react';
import "../styles/dashboard.css"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Axios from "axios"
import { MyTable2 } from './dashboard';

const columns = [
  { id: 'first_name', label: 'First Name', minWidth: 170, align: "left" },
  { id: 'last_name', label: 'Last Name', minWidth: 170, align: "left" },
  { id: 'email', label: 'Mail', minWidth: 170, align: "right" },
];

function createData(first_name, last_name, email) {
  return { first_name, last_name, email };
}

// const rows = [
//   createData('India', "amos mail"),
//   createData('China', "amo "),
//   createData('Italy', ""),
//   createData('United States', ""),
//   createData('Canada', "kkk"),
//   createData('Australia', "hh"),
//   createData('Germany', 'DE'),
//   createData('Ireland', 'IE'),
// ];

const useStyles = makeStyles({
  root: {
    width: '80vw',
    margin: "0 auto"
  },
  container: {
    maxHeight: 440,
  },
});

export function MyTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  var rowes = []
  const [rows, setrow] = React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const setter = ()=>{
    for(let a = 0; a < props.rows.length; a++) {
      rowes= [...rowes,createData(props.rows[a].first_name, props.rows[a].last_name,props.rows[a].email)]
    }
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    setter()
  
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: "#101010", color: "white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
            rowes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                student: [],
                staff: []
            }
        }
        this.counter = this.counter.bind(this)
    }
    async counter(){
        let token = await localStorage.getItem("token")
        await Axios({
            url: `https://smg-schoo.herokuapp.com/api/use?token=${token}`,
            method: "GET"
        }).then(data=>{
          if (data.data !== null) {
            this.setState({data: data.data})
          } else {
          }
        }).catch(err=>{
          console.log(JSON.stringify(err))
        })
    }
    componentDidMount(){
      this.counter()
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
                            <span className="count">{this.state.data.student.length}</span>
                            <span className="title">students</span>
                        </div>
                        <div className="infoTab" style={{width: "calc(100% / 2 - 10px"}}
                          onClick={()=>{
                            document.querySelector(".tab.first").style.opacity = 0
                            document.querySelector(".tab.second").style.opacity = 1
                          }}
                        >
                            <span className="count">{this.state.data.staff.length}</span>
                            <span className="title">staff</span>
                        </div>
                    </div><div className="container">
                        <div className="tab first" style={{opacity: 1}}>
                          <h3>Students</h3>{
                            this.state.data.student.length >=1 ? 
                            <MyTable2 key="0" rows={this.state.data.student} type="students"/>: ""
                          }
                        </div>
                        <div className="tab second">
                          <h3>Staffs</h3>{
                            this.state.data.staff.length >= 1 ?
                            <MyTable key="1" rows={this.state.data.staff} type="staff"/>: ""}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default AdminDashboard 
