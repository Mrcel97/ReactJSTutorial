import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
    // Global variables due to avoid to declare in every function.
    winner;
    history;
    current;

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null), // Now Board Component will not store the state of the game any more.
            }],
            xIsNext: true,
        }
    }

    handleClick(i) { /* Due Game Component now have the squares state and Board Component only uses their props this Coponent will 
                      * handleClicks.*/
        const squares = this.current.squares.slice();
        if (this.winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: this.history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const MAX_LEN = 9;
        this.history = this.state.history;
        this.current = this.history[this.history.length-1];
        this.winner = calculateWinner(this.current.squares); // Due Game Component now have the squares state this Component will calculateWinner.

        const moves = this.history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}> {/* React dinamic lists need to have a key to diferenciate each other. If no key is provided this will
                                  * generate a warning message. */}
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (this.winner) {
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
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function calculateWinner(squares) {
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
            return squares[a];
        }
    }
    return null;
}

// ==================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)