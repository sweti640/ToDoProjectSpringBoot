import React, { Component } from 'react'
import ApiService from '../Service/ApiService';

export class ShowTask extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             tasks:[],
             message:null,
             isactivated:false
        }
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount(){
        this.reloadUserList();
    }

    reloadUserList() {
        var email=localStorage.getItem("currentUser");
        console.log(email)
        ApiService.fatchTask(email).then((res) => {
                console.log(res) 
                this.setState({tasks: res.data})
            });
    }

    deleteTask(taskId) {
        ApiService.deleteUser(taskId)
           .then(res => {
               console.log(res)
                this.setState({message : 'User deleted successfully.'});
               alert(this.state.message)
               console.log(this.state.tasks)
               this.setState({tasks: this.state.tasks.filter(task => task.id !== taskId)});
               window.location.reload()
            })
        }

        editTask(task_id) {
            alert("hii");
            window.localStorage.setItem("task_id",task_id);
            this.props.history.push('/EditTask');
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

        AddTask=()=>{
            this.props.history.push('/AddTask')
        }
         check=(e)=>{
                var tid=e.target.value
                console.log(tid)
                var arr=this.state.tasks
                console.log(arr)
                
        
                for(var i=0;i<arr.length;i++)
                {
                    if(arr[i].task_id==tid){
                        // console.log(arr[i].firstName)
                        // console.log(arr[i].statu)
                        if((this.state.isactivated==true) && (arr[i].statu='panding'))
                        {
        
                            this.setState({
                                isactivated:false,
                                tasks:arr
                                
                            })
                            
                            
                        }
                        if((this.state.isactivated==false) && (arr[i].statu='completed'))
                        {
                            this.setState({
                                isactivated:true,
                                tasks:arr
                            })
                        
                        }
                        console.log(arr[i].firstName)
                            console.log(arr[i].statu)
                          
                            let task ={task_id:tid,
                                statu:arr[i].statu
                            }; 
                            ApiService.editTaskStatu(task).then(res => {
                                this.setState({message : 'edited'});
                               //this.props.history.push('/users'); 
                               console.log(res)
                               console.log(res.data)
                               this.setState({message : res.data});
                               alert(this.state.message)
                          
                           });  
        
                    }
                   
                }
                console.log(arr)
             }
    
    render() {
        return (
            <div>
                 <div className='container'>
                <h3> welcome</h3>
                <center><h3 className='text-danger'> Show your All Task   </h3>  </center>
                <button type="button"  style={{marginLeft: '20px'}} className='btn btn-primary right' onClick={this.AddTask} > Add Task </button>&nbsp;&nbsp;&nbsp;&nbsp;    
                <button type="button" className='btn btn-primary right' onClick={this.signOut}> Sign Out </button>  
               
                <table className='table table-hover striped m-5' border='1'>
                   <tr>
                   <th scope='col'>Task_Id </th>
                            <th scope='col'>Task_Name </th>
                            <th scope='col'>Task_Discription </th>
                            <th scope='col'>Date</th>
                            <th scope='col'>statu</th>
                   </tr>
                   <tbody>
                       {
                   this.state.tasks.map( task =>
                                    <tr key={task.task_id}>
                                        <td>{task.task_id}</td>
                                        <td>{task.task_name}</td>
                                        <td>{task.description}</td>
                                        <td>{task.date}</td>
                                        <td> <button onClick={this.check} value={task.task_id}>{task.statu} </button> </td>
                                        <td><button className="btn btn-success" onClick={() => this.editTask(task.task_id)} style={{marginLeft: '20px'}}> Edit</button></td>
                                        <td><button className="btn btn-danger" onClick={() => this.deleteTask(task.task_id)}> Delete</button></td>
                                    </tr>
                            )
                   }
                            
                   </tbody>

                   

               </table>
            </div>
                
            </div>
        )
    }
}

export default ShowTask
