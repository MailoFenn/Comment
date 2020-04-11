import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            newName: '',
            newText: '',                   
        }
        
        this.textAreaStyle = {};
    }

    componentDidMount() {
        if(localStorage.getItem('state') != null) {
            let comments = JSON.parse(localStorage.getItem('state'));

            this.setState({comments})
        }
    }

    addComment() {
        let comments = [...this.state.comments];
        let date = new Date;
        let localTime = date.toLocaleTimeString();
        let localDate = date.toLocaleDateString();

        if(this.state.newText === '') {
            this.textAreaStyle = {borderColor: 'red'};
        } else if(this.state.newName === '') {
            comments.push({text: this.state.newText, author: 'Аноним', date: localDate, time: localTime});   
        } else {
            comments.push({text: this.state.newText, author: this.state.newName, date: localDate, time: localTime});
        }
        
        this.setState({comments, newName: '', newText: ''});
        
        localStorage.setItem('state', JSON.stringify(comments));
    }

    delete(key) {
        let comments = [...this.state.comments];
        comments.splice(key, 1);

        console.log(comments);

        this.setState({comments});

        localStorage.setItem('state', JSON.stringify(comments));
    }

    render() {
        return(
            <div className='comments'>
                <Form
                textAreaStyle={this.textAreaStyle}
                valueName={this.state.newName}
                valueText={this.state.newText}
                onChangeName={(ev) => {
                    this.setState({newName: ev.target.value});
                }}
                onChangeText={(ev) => {
                    this.setState({newText: ev.target.value});
                }}
                onClickButtton={() => {
                    this.addComment();
                }} />
                {this.state.comments.map((comments, i) => {
                    return(
                        <Comments
                        key={i} 
                        author={comments.author}
                        time={comments.time}
                        date={comments.date}
                        text={comments.text}
                        onClick={() => {
                            this.delete(i);
                        }} />
                    );
                })}
                
            </div>
        );
    }
}

function Form(props) {
    return(
        <div>
            <p>Имя: <input
            className='inputname'
            value={props.valueName}
            onChange={props.onChangeName}
            type='text'
            name='author'></input></p>

            <p><textarea
            style={props.textAreaStyle}
            value={props.valueText}
            onClick={(ev) => {
                ev.target.style = 'border-color: black';
            }}
            onChange={props.onChangeText}></textarea></p>
            
            <p><button onClick={props.onClickButtton}>Отправить</button></p>
        </div>
    );
}

function Comments(props) {
    return(
        <div key={props.key} className='comment'>
            <p className='name'>{props.author}</p>
            <p className='time'>{props.time}</p>
            <p className='time'>{props.date}</p>
            <img className='delete'
            onClick={props.onClick}
            src='src/delete.png'></img>
            <p className='text'>{props.text}</p> 
        </div> 
    );
}

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
);