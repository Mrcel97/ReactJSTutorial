import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
    winner;
    history;
    current;

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        this.history = this.state.history.slice(0, this.state.stepNumber + 1);
        this.current = this.history[this.history.length - 1];
        const squares = this.current.squares.slice();
        if (this.winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: this.history.concat([{
                squares: squares,
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
        winnerResult = calculateWinner(this.current.squares);

        const moves = this.history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
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
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}


class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                winner={isWinner(i, this.props.winnerLine)}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function Square(props) {
    var liClasses = "square"

    if (props.winner) { liClasses = liClasses.concat(" winner") }

    return (
        <button className={liClasses} onClick={props.onClick}>
            {props.value}
        </button>
    );
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

// ==================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)