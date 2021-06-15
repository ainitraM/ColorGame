import React, {Component} from "react";
import {CELL_SIZE} from './Board';

class Cell extends Component {

    render() {
        const { x, y, color} = this.props;
        alert(x + "," + y);
        const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'black'];
        return (
            <div className="Cell" style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
                backgroundColor: color
            }} />
        );
    }
}

export default Cell;