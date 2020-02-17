import React, { Component } from 'react';
import "../styles/dashboard2.css"
import Axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'first_name', label: 'First Name', minWidth: 170, align: "left" },
  { id: 'last_name', label: 'Last Name', minWidth: 170, align: "left" },
  { id: 'email', label: 'Mail', minWidth: 170, align: "right" },
  { id: '_class', label: 'class', minWidth: 170, align: "right" },
];

function createData(first_name, last_name, email, _class) {
  return { first_name, last_name, email, _class };
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

export function MyTable2(props) {
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
      rowes= [...rowes,createData(props.rows[a].first_name, props.rows[a].last_name,props.rows[a].email,props.rows[a].class)]
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

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            data: {
                student: []
            },
            page: 0,
            rowsPerPage: 0
        }
    }

    async counter(){
        let token = await localStorage.getItem("token")
        await Axios({
            url: `http://localhost:1100/api/use?token=${token}`,
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
    render(){
        return (
            <section className="Dashboard">
            <div className="wrapper">
                <div className="infoTab">
                    <span className="count">{this.state.data ? this.state.data.student.length: 0}</span>
                    <span className="title">students</span>
                </div>
                    <MyTable2 key="1" rows={this.state.data.student} type="student"/>
                </div>
            </section>
        )
    }
}

export default Dashboard


