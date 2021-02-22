import React, { Component } from 'react'
import ApiService from '../Service/ApiService';

export class AddTask extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             TaskName:'',
             Description:'',
            date:'',
            Statu:'',
            Email:''

        }
        this.addTask=this.addTask.bind(this);
        // this.showTask=this.showTask.bind(this);
    }

    onchange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    addTask = (e )=> {
        e.preventDefault();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log(date)
        var temp=localStorage.getItem("currentUser");
        console.log(temp)
        let task ={task_name:this.state.TaskName,
            description:this.state.Description,
            statu:"panding",
            email:temp
        };
        console.log(task);
        ApiService.addTask(task).then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({message : 'Task added successfully.',
                            TaskName:'',
                            Description:''});
                alert(this.state.message)
                
            });

    }
    showTask = (e )=> {
        e.preventDefault();
        this.props.history.push('/ShowTask');

    }
    signOut=()=>{
        var result=(window.confirm("you want to signOut"))
        console.log(result)
    if(result)
            {
                localStorage.removeItem('currentUser')
                this.props.history.push('/Login')
            }
        }
    
    render() {
        return (
            <div className='container'>

            <button type="button" className='btn btn-primary right' onClick={this.signOut}> Sign Out </button>     

            <form className="tinner">
                <h3>Add Your Task Here </h3>

            <div className="form-group">
                <label>Task Name:</label>
                <input type="email" name='TaskName'  value={this.state.TaskName} onChange={this.onchange}  className="form-control" placeholder="Enter your task" />
            </div>
            <div className="form-group">
                <label>Task Description:</label>
                <textarea  name='Description' value={this.state.Description} onChange={this.onchange} className="form-control" placeholder="Enter the task description" />
            </div>
            <button type="submit" className="btn btn-dark btn-block" onClick={this.addTask}>Add</button>
            <button type="submit" className="btn btn-dark btn-block" onClick={this.showTask}>Show Task</button>
            </form>

            </div>
        )
    }
}

export default AddTask
