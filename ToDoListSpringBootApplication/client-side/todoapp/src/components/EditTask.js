import React, { Component } from 'react'
import ApiService from '../Service/ApiService';

export class EditTask extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Task_id:'',
            TaskName:'',
            Description:'',
           date:'',
           Statu:'',
           Email:'',
           message:null
        }
        this.saveTask = this.saveTask.bind(this);
        this.loadTask = this.loadTask.bind(this);
    }

    componentDidMount() {
        this.loadTask();
    }

    onchange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

    loadTask() {
        ApiService.fetchTaskById(window.localStorage.getItem("task_id"))
            .then((res) => {
               
                let task = res.data;
                 this.setState({
                    Task_id:task.task_id,
                    TaskName:task.task_name,
                    Description:task.description,
                    Statu:task.statu,
                    }) 
            });
    }

    saveTask = (e) => {
        e.preventDefault();
        var email=localStorage.getItem("currentUser");
        let task = {task_id: this.state.Task_id,task_name: this.state.TaskName, 
            description: this.state.Description, statu: this.state.Statu,email:email};
           
            console.log(task)
        ApiService.editTask(task)
            .then(res => {
                 this.setState({message : 'User added successfully.'});
                //this.props.history.push('/users'); 
                console.log(res)
                console.log(res.data)
                this.setState({message : res.data});
                alert(this.state.message)
                this.props.history.push('/ShowTask');
            });
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
            <form className="linner">
                <h3>Edit Your Task Here</h3>
                <button type="button" className='btn btn-primary right' onClick={this.signOut}> Sign Out </button>     
            <div className="form-group">
                <label>Task Name:</label>
                <input type="email" name='TaskName'  value={this.state.TaskName} onChange={this.onchange}  className="form-control" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label>Task Description:</label>
                <textarea  name='Description' value={this.state.Description} onChange={this.onchange} className="form-control" placeholder="Enter the task Description" />
            </div>
            <button type="submit" className="btn btn-success" onClick={this.saveTask}>Edit&Add</button>
           </form>
        )
    }
}

export default EditTask
