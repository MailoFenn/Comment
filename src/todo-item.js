import React from 'react';

let TodoItem = (props) => {
    let className = props.cheked ? 'cheked' : '';

    return (
        <li 
            className={className}
            onClick={props.toggleTodo}
        >
        {props.name}
        </li>
    );
}

export default TodoItem;