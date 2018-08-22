import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
            </div>
        </div>
        );
    }
}


class Board extends React.Component {
    constructor(props) {                                    // Add Square Components (children) behaviour to Board Component (parent)
        super(props);
        this.state = {
            squares: Array(9).fill(null),                   // 3x3 Array of no-state cells.
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();         // Shallow copy
        squares[i] = 'X';                                   // (*)... Then this number will be used to update only the specific Square.
        this.setState({squares: squares});
    }

    renderSquare(i) {                                       // When we create a Square we assign a numer to it ...(*)
        return (
            <Square 
                value={this.state.squares[i]}               // Set the 'this.props.value' of the Square Component to 'X', 'O' or Null.
                onClick={() => this.handleClick(i)}         // Function defined by Board Component to help us to update Board state without privacity problems.
            />
        );
    }

    render() {
        const status = 'Next Player X';

        return (
            <div>
                <div className="status">{status}</div>
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

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button
                className="square" 
                onClick={() => this.props.onClick()}        // onClick() will generate a 'click event' handled by handleClick() function in Board Component.
            >
                {this.props.value}                          {/* Now we are interessed in work with 'this.props.value' due to be updated by the BoardComponent 
                                                              * 
                                                              * Explication:
                                                              *     · State:
                                                              *         - Individual local states.
                                                              *         - Often become the props of the Child Components.
                                                              *         - Inmutable (by any other Component)
                                                              *         - Mutable (by the same Component)
                                                              *     
                                                              *     · Props:
                                                              *         - External given stats.
                                                              *         - Always given by a Parent Component.
                                                              *         - Inmutable (by the same or other components)
                                                              *         - Mutable (by the Parent Component) <- We want this data flow
                                                              * */}
            </button>
        );
    }
}


// ==================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)