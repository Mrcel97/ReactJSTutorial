import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
    winner;
    history;
    current;
    winnerLine;
    positions;

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                coordinates: Array(9).fill(null),
                lastPush: null
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i, pos) {
        this.history = this.state.history.slice(0, this.state.stepNumber + 1);
        this.current = this.history[this.history.length - 1];
        this.positions = this.history[this.history.length - 1];
        const squares = this.current.squares.slice();
        const coordinates = this.positions.coordinates.slice();
        const lastPush = i;

        if (this.winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        coordinates[i] = pos;
        this.setState({
            history: this.history.concat([{
                squares: squares,
                coordinates: coordinates,
                lastPush: lastPush,
            }]),
            stepNumber: this.history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.winner = null;
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const MAX_LEN = 9;
        let winnerResult;
        this.history = this.state.history;
        this.current = this.history[this.state.stepNumber];
        this.positions = this.history[this.state.stepNumber];
        winnerResult = calculateWinner(this.current.squares);

        const moves = this.history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        const coordinates = this.history.map((step, pos) => {
            if (!step.coordinates[step.lastPush]) { return null; }
            const desc = pos ? 'X: ' + step.coordinates[step.lastPush][0] + ' Y: ' + step.coordinates[step.lastPush][1] : null;
            return (
                <li key={pos}>
                    <span>{desc}</span>
                </li>
            );
            
        })

        let status;
        if (winnerResult) {
            this.winner = winnerResult.shift();
            status = 'Winner: ' + this.winner;
        } else if (this.history.length-1 === MAX_LEN) { 
            status = 'Draw...';
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={this.current.squares}
                    winnerLine={winnerResult}
                    onClick={(i, pos) => this.handleClick(i, pos)}
                    lastPush={this.state.history[this.state.stepNumber].lastPush}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            <div className="game-info">
                <div>Click Log</div>
                <ul className="coordinates">{coordinates}</ul>
            </div>
        </div>
        );
    }
}


class Board extends React.Component {

    renderSquareRow(a) {
        return (
            <div key={a} className="board-row">
                <SquareRow
                    squares={this.props.squares}
                    rowNum={a}
                    winnerLine={this.props.winnerLine}
                    lastPush={this.props.lastPush}
                    onClick={(i, pos) => this.props.onClick(i, pos)}
                />
            </div>
        );
    }

    getTableHTML() {
        const MAX_ROWS = 3;
        var html = [];
        
        for (let row = 0; row < MAX_ROWS; row++) {
            html = html.concat(this.renderSquareRow(row));
        }

        return html;
    }

    render() {
        return (
            <div>
                {this.getTableHTML()}
            </div>
        );
    }
}

function SquareRow(props) {

    function renderSquare(i) {
        var pos = calculatePos(i);
        return (
            <Square
                key={pos}
                selected={props.lastPush === i}
                winner={isWinner(i, props.winnerLine)}
                value={props.squares[i]}
                pos={pos}
                onClick={() => props.onClick(i, pos)}
            />
        );
    }

    function getRowHTML() {
        const MAX_SQUARE = (props.rowNum+1) * 3
        const MAX_COLS = 3;
        var html = [];
        
        for (let square = props.rowNum * MAX_COLS; square < MAX_SQUARE; square++) {
            html = html.concat(renderSquare(square));
        }

        return html;
    }

    return getRowHTML();

}

function Square(props) {
    var liClasses = "square"

    liClasses = applyClasses(props, liClasses);

    return (
        <button key={props.pos} className={liClasses} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function applyClasses(props, liClasses) {
    if (props.winner) { 
        liClasses = liClasses.concat(" winner") 
    } else if (props.selected) { 
        liClasses = liClasses.concat(" selected") 
    }
    return liClasses;
}

function calculateWinner(squares) {
    const winnerLine = [];
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winnerLine.push(a,b,c);
            return [squares[a], winnerLine];
        }
    }
    return null;
}

function isWinner(i, winnerLine) {
    if (!winnerLine) { return; }
    return i === winnerLine[0][0] ||
           i === winnerLine[0][1] || 
           i === winnerLine[0][2];
    
}

function calculatePos(i) {
    const MAX_WIDTH = 3;
    var row = parseInt(i / MAX_WIDTH , 10);
    var col = i % MAX_WIDTH;

    return [row, col];
}

// ==================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)