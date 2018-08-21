import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
    render() {                              // Render html code in js file (BAD PRACTICE).//
        return (
        <div className="game">              {/* React comment example */}
            <div className="game-board">    {/* Space destined to host an specific component */}
                <Board />                   {/* (3rd step) Link Board component with Game component */}
            </div>
            <div className="game-info">     {/* Space destined to log Game actions */}
            </div>
        </div>
        );
    }
}


class Board extends React.Component {

    renderSquare(i) {                       // (4th step) New function to make easier the Square Component insertion.
        return <Square value={i} />;
    }

    render() {
        const status = 'Next Player X';     // Board need to know who is playing, set initial Board state to player 'X' or 'O'.

        return (                            // We want a [3row x 3col] tic-tac-toe
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}  {/* Insert Square Component */}
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

class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {this.props.value}          {/* 'this.props.value' let us acccess to value propertie of Square tag 
                                              * 
                                              * Example:
                                              *     <Square value={'THIS_PROPS_VALUE'} />
                                              * */}
            </button>
        );
    }
}


// ==================================

ReactDOM.render(
    <Game />,                                // Load Game component into DOM
    document.getElementById('root')
)