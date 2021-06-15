import React, {Component} from "react";
import Timer from "./Timer";
import Board from "./Board";
import './Game.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
        this.handleInputName = this.handleInputName.bind(this);
    }

    handleInputName = (val) => {
        this.setState({name: val});
    }


    render() {
        return (
          <div>
              {this.state.name ? <Board />
                  : <Timer handleInput={this.handleInputName}/>}
          </div>
        );
    }
}

export default Main;