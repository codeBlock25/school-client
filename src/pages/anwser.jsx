import React from 'react';
import "../styles/answer.css"
import { FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { ClipLoader } from "react-spinners"
import Axios from "axios"

class Anwser extends React.Component {
  constructor(props){
    super(props)
    this.state={
      questions: [
      ],
      choosen: "a",
      questionCount: 0,
      pquestion: [],
      loading: false,
      right: 0
    }
    this.fetchQuestion = this.fetchQuestion.bind(this)
    this.takeAnwser = this.takeAnwser.bind(this)
  }
  async fetchQuestion(){
    this.setState({loading: true})
    let questionType = this.props.location.pathname.split("/")[2]
    let token = localStorage.getItem("token")
    await Axios({
      method: "GET",
      url: `https://smg-schoo.herokuapp.com/api/questions?questiontype=${questionType}&token=${token}`
    }).then(data=>{
      this.setState({questions: data.data.questions})
      setTimeout(()=>{
        this.setState({loading: false})
      }, 1000)
    }).catch(err=>{
      this.setState({questions: []})
      setTimeout(()=>{
        this.setState({loading: false})
      }, 1000)
      console.log(err)
    })
  }
  takeAnwser(){
    if (this.state.questions[this.state.questionCount].anwser === this.state.choosen) {
      this.setState({right: this.state.right + 1})
    } else {
      this.setState({right: this.state.right})
    }
  }
  async componentDidMount(){
    await this.fetchQuestion()
    this.setState({pquestion: this.state.questions[this.state.questionCount]})
    console.log(this.state.questions[this.state.questionCount])
  }
  render (){
        return (
            <div className="Answer">
              { this.state.loading?
              <div className="loadQ">
                <div className="l">
                  <span>loading...</span>
                  <ClipLoader size="200" color="black"/>
                </div>
              </div>:
                this.state.questions.length <= 0 ?
                <div className="wrapper">
                    <div className="quest">
                        no text/exam at this moment
                    </div>
                </div>
                :
                <div className="answerWrapper">
                    <h3 className="title">Exam</h3>
                    <p className="sht">{this.state.questions.length} questions {this.state.questions.length - this.state.questionCount} to go</p>
                  <span className="questionToBe">{this.state.questions[this.state.questionCount].question}</span>
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.choosen==="a"? true : false} onClick={()=>this.setState({choosen: "a"})} value="a" />
                        }
                        label={this.state.questions[this.state.questionCount].firstOption}
                        style={{display: "block"}}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.choosen==="b"? true : false} onClick={()=>this.setState({choosen: "b"})} value="b" />
                        }
                        label={this.state.questions[this.state.questionCount].secondOption}
                        style={{display: "block"}}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.choosen==="c"? true : false} onClick={()=>this.setState({choosen: "c"})} value="c" />
                        }
                        label={this.state.questions[this.state.questionCount].thirdOption}
                        style={{display: "block"}}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.choosen==="d"? true : false} onClick={()=>this.setState({choosen: "d"})} value="d" />
                        }
                        label={this.state.questions[this.state.questionCount].fouthOption}
                        style={{display: "block"}}
                    />
                    <Button className="nxtBtn" onClick={()=>{
                      if(this.state.questionCount >= this.state.questions.length - 1) {
                        this.setState({questionCount: this.state.questionCount})
                      }else {
                        this.setState({questionCount:  this.state.questionCount + 1})
                      }
                    }}>{this.state.questions.length - 1 === this.state.questionCount? "submit": "next"}</Button>
                </div>
                }
            </div>
        )
    }
}

export default Anwser
