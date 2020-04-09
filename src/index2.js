import React from 'react';
import ReactDOM from 'react-dom';

const HelloWorld = () => {
    return <h1>Hello world</h1>;
}

class TodoApp extends React.Component {
    constructor() {
        super();

        this.state = {
            todos: [
                { name:'Option webpack', checked: true },
                { name: 'Run webpack-web-server', checked: true },
                { name: 'Option TodoApp', checked: false }
            ]
        };
    }

    toggleTodo(key) {
        const todos = this.state.todos.map((todo, i) => {
            if (key === i) {
                return{
                    name: todo.name,
                    checked: !todo.checked
                }
            } else {
                return todo;
            }
        })

        this.setState({ todos });
    }

    addTodo() {
        let todos = this.state.todos;
        todos.push({
            name: this.state.newTodoText,
            cheked: false
        });

        this.setState({
            todos,
            newTodoText: ''
        });
    }

    render() {
        return (
            <div>
                <h2>ToDo List</h2>
                <ol>
                    {
                        this.state.todos.map((todo, i)  => {
                            const className = todo.checked ? 'cheked' : '';
                            return (
                                <li 
                                    key={i} 
                                    className={className} 
                                    onClick={() => {this.toggleTodo(i) }}
                                >
                                    {todo.name}
                                </li>
                            )
                        })
                    }
                </ol>

                <input
                    type="text"
                    placeholder="New task"
                    value={this.state.newTodoText}
                    onChange={ev => {
                        this.setState({ newTodoText: ev.target.value });
                    }}
                    onKeyUp={ev => {
                        if (ev.keyCode === 13) {
                            this.addTodo();
                        }
                    }}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <TodoApp />,
    document.querySelector('#app')
)