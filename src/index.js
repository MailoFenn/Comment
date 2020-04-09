import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
    constructor() {
        super();

        let commentsArr = JSON.parse(localStorage.getItem('state'));

        console.log(typeof(commentsArr[1]));

        this.state = {
            comments: [],
            newName: '',
            newText: '',                   
        }      
    }

    addComment() {
        let comments = this.state.comments;
        comments.push({text: this.state.newText, author: this.state.newName, time: new Date});

        

        this.setState({comments, newName: '', newText: ''});

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
                <p className='time'>{comment.time.toLocaleTimeString()}</p>
                <p className='time'>{comment.time.toLocaleDateString()}</p>
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