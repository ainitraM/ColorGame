import React, {Component} from 'react';
import './Game.css';

export const CELL_SIZE = 40;
const WIDTH = 920;
const HEIGHT = 560;

const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'black'];

class Board extends Component {
    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.makeEmptyBoard();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    state = {
        colorBoard: [],
        cells: [],
        color: null,
        x: null,
        y: null
    }

    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = this.makeColor();
                this.state.cells.push(<div className="Cell" style={{
                    left: `${CELL_SIZE * x + 1}px`,
                    top: `${CELL_SIZE * y + 1}px`,
                    width: `${CELL_SIZE - 1}px`,
                    height: `${CELL_SIZE - 1}px`,
                    backgroundColor: board[y][x]}}/>)
                this.state.colorBoard.push({
                    id: this.cols*y + x,
                    cordY: y,
                    cordX: x,
                    color: board[y][x]});
            }
        }
        return board;
    }

    makeColorBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                board.push({cordX: x}, {cordY: y}, {color: this.board[y][x]});
            }
        }
        alert(board);
        return board;
    }

    makeColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    forceUpdateHandler(){
        this.forceUpdate();
    };

    updateItem = (id, whichvalue, newvalue)=> {
        let index = this.state.colorBoard.findIndex(x => x.id == id);
        if (index !== -1){
            this.state.colorBoard[id].color = newvalue;
            this.forceUpdateHandler();
        }
        else {
            console.log('No match');
        }
    }

    handleBoardClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        this.state.x = Math.floor(offsetX / CELL_SIZE);
        this.state.y = Math.floor(offsetY / CELL_SIZE);
        this.state.color = this.board[this.state.y][this.state.x];
        let index = this.cols*this.state.y + this.state.x;
        if (this.board[this.state.y][this.state.x] == "orange") {
            this.board[this.state.y][this.state.x] = "blue"
            this.state.color = this.board[this.state.y][this.state.x];
            //this.makeColorBoard();
            this.updateItem(index, "color", "blue");
            //alert(this.state.cells.findIndex());
        }
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    render() {
        return (
            <div>
                <div className="Board"
                     style={{
                         width: WIDTH+1,
                         height: HEIGHT+1,
                         backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                     onClick={this.handleBoardClick}
                     ref={(n) => { this.boardRef = n; }}>
                </div>
                <div className="Cell" style={{
                    width: WIDTH - CELL_SIZE+1,
                    height: HEIGHT - CELL_SIZE+1}}
                     onClick={this.handleBoardClick}>
                    {this.state.colorBoard.map((element) => {
                        return (
                            <div className="Cell" style={{
                                left: `${CELL_SIZE * element.cordX + 1}px`,
                                top: `${CELL_SIZE * element.cordY + 1}px`,
                                width: `${CELL_SIZE - 1}px`,
                                height: `${CELL_SIZE - 1}px`,
                                backgroundColor: element.color}} />
                        );
                    })}
                  </div>
            </div>
        )
    };
}

export default Board

/*                <div className="Cell" style={{
                        width: WIDTH - CELL_SIZE+1,
                        height: HEIGHT - CELL_SIZE+1}}
                     onClick={this.handleBoardClick}>
                {this.state.cells}
                </div> */