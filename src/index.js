import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
    constructor() {
        super();

        this.state = {
            comments: [],
            newName: '',
            newText: '',                   
        }      
    }

    componentDidMount() {
        if(localStorage.getItem('state') !== null) {
            let comments = localStorage.getItem('state');
            comments = JSON.parse(comments);
            let arr = [];
        
            comments.map((item) => {
                arr.push(item);
            });

            this.setState({comments: arr})

        }
    }

    addComment() {
        let comments = this.state.comments;
        let date = new Date;
        let localTime = date.toLocaleTimeString();
        let localDate = date.toLocaleDateString();

        if(this.state.newText === '') {
            let textArea = document.querySelector('textarea');
            textArea.style.borderColor = 'red';
        } else if(this.state.newName === '') {
            comments.push({text: this.state.newText, author: 'Аноним', date: localDate, time: localTime});
            this.setState({comments, newName: '', newText: ''});
        } else {
            comments.push({text: this.state.newText, author: this.state.newName, date: localDate, time: localTime});
            this.setState({comments, newName: '', newText: ''});
        }
        

        localStorage.setItem('state', JSON.stringify(this.state.comments));
    }

    delete(key) {
        let comments = this.state.comments;
        comments.splice(key, 1);

        console.log(comments);

        this.setState({comments});

        localStorage.setItem('state', JSON.stringify(this.state.comments));
    }

    render() {
        return(
        <div className='comments'>
            <p>Имя: <input className='inputname'
            value={this.state.newName}
            onChange={(ev) => {
                this.setState({newName: ev.target.value});
            }}
            type='text'
            name='author'></input></p>

            <p><textarea value={this.state.newText}
            onClick={(ev) => {
                ev.target.style = 'border-color: black';
            }}
            onChange={(ev) => {
                this.setState({newText: ev.target.value});
            }}></textarea></p>
            
            <p><button onClick={() => {
                this.addComment();
            }}>Отправить</button></p>

            {this.state.comments.map((comment, i) => {
            return(
            <div key={i} className='comment'>
                <p className='name'>{comment.author}</p>
                <p className='time'>{comment.time}</p>
                <p className='time'>{comment.date}</p>
                <img className='delete'
                onClick={() => {
                    this.delete(i);
                }}
                src='src/delete.png'></img>
                <p className='text'>{comment.text}</p> 
            </div> 
            );
            })}

            {
        }
           
        </div>  
        )

    }
}

ReactDOM.render(
    <Comment/>,
    document.querySelector('#app')
);