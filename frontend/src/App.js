import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";



class AddTodo extends Component{
  handleKeyUp(event){
    if (event.keyCode === 13) {
        let text = event.target.value;
        if (!text) return;
        event.target.value = '';
        const item = {
            title: text,
            description: "no description",
            created_at: new Date().toLocaleTimeString(),
            is_completed: false,
        };
        axios.post('http://127.0.0.1:8001/api/', item)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
  }
  render(){
    return(
        <input id={"input"} class="addtodo"
                pattern="[A-Za-z\s]+"
                placeholder="what you want to do"
               onKeyUp={ this.handleKeyUp.bind(this)}/>
    );
  }
}


export class TodoItem extends Component{
  handleClick(item){
    item.is_completed = !item.is_completed

    axios.put( 'http://127.0.0.1:8001/api/'+item.id, item)
        .then(function(response){
            console.log(response);
        })
        .catch(function(err){
            console.log(err);
        });
  }

  handleDelete(item){
    axios.delete( 'http://127.0.0.1:8001/api/'+item.id, item)
        .then(function(response){
            console.log(response);
        })
        .catch(function(err){
            console.log(err);
        });
  }

  handleDoubleClick(e,item){
    var target = e.target;
    target.readOnly = false;
      var text = item.title;
      target.value = text;
      target.placeholder = "";
  }
  handleKeyUp(event,item){

    if (event.keyCode === 13){
        event.target.placeholder = item.title;
        let text = event.target.value;
        if (!text) return;

        item.title = text;
        axios.put('http://127.0.0.1:8001/api/'+item.id, item)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            });
        event.target.readOnly = true;
        event.target.value = "";
    }
  }

  render(){
    const tableClass = this.props.class;
    if(this.props.value.is_completed){
        if(tableClass === "undo"){
            return "";
        }
    }
    else{
        if(tableClass === "done"){
            return "";
        }
    }

    const todoitem = this.props.value;
    const title_text = todoitem.title;
    return(

        <tr name={"todoitem"}>
            <td class="label">
                <button class={tableClass} onClick={()=>this.handleClick(todoitem)}> </button>
            </td>
            <td class="title" >
                <input class="title"  type="text" readOnly={true} onDoubleClick={(e)=>this.handleDoubleClick(e,todoitem)} onKeyUp={(e)=>this.handleKeyUp(e,todoitem)} placeholder={title_text} >
                </input>
            </td>
            <td class = "delete">
                <button class="delete" onClick={()=>this.handleDelete(todoitem)}> </button>
            </td>

        </tr>
    );

  }

}



class TodoTable extends Component{
  render(){
    var data;
    if(this.props.class === "undo"){
        data = this.props.val.reverse()
    }else{
        data = this.props.val
    }

    return(
        <table>
          {data.map(item =>(
           <TodoItem value={item} class={this.props.class} > </TodoItem>
          ))}
        </table>
    );

  }
}



class App extends Component {

  state = {

    todos: []

  };

  async componentWillUpdate() {

    try {

      const res = await fetch('http://127.0.0.1:8001/api/todos');

      const todos = await res.json();

      this.setState({

        todos

      });

    } catch (e) {

      console.log(e);

    }

  }

  render() {
    return (
      <div style={App.css}>
          <div>
            <div>
                <AddTodo class="add" />
            </div>

            <p> Tasks to do... </p>
            <div>
                <TodoTable class="undo" val={this.state.todos}/>
            </div>
              <p> Tasks done! </p>
            <div>
                <TodoTable class="done" val={this.state.todos}/>
            </div>

        </div>
      </div>

    );

  }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

export default App;
