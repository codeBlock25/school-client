import React, { Component } from 'react';
import "../styles/take.css"
import { Button } from '@material-ui/core';


class TakeQuestion extends Component {
    render() {
        return (
            <section className="Take">
                <div className="wrappper">
                    <Button className="quest test" onClick={()=>this.props.history.push("/take/test")}>
                        take test
                    </Button>
                    <Button className="quest exam" onClick={()=>this.props.history.push("/take/exam")}>
                        take exam
                    </Button>
                </div>
            </section>
        )
    }
}

export default TakeQuestion