import React, { Component } from 'react'
import ApiService from '../Service/ApiService';

export class AdminView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: [],
            message: null,
            isactivated:false
        }
        this.reloadUserList = this.reloadUserList.bind(this);
    }
    componentDidMount() {
        this.reloadUserList();
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

    reloadUserList() {
        ApiService.fetchUser().then((res) => {
                console.log(res) 
                this.setState({users: res.data})
            });
    }
    check=(e)=>{
        var eid=e.target.value
        console.log(eid)
        var arr=this.state.users
        console.log(arr)
        

        for(var i=0;i<arr.length;i++)
        {
            if(arr[i].id==eid){
                // console.log(arr[i].firstName)
                // console.log(arr[i].statu)
                if((this.state.isactivated==true) && (arr[i].statu='activeted'))
                {

                    this.setState({
                        isactivated:false,
                        users:arr
                        
                    })
                    
                    
                }
                if((this.state.isactivated==false) && (arr[i].statu='deactiveted'))
                {
                    this.setState({
                        isactivated:true,
                        users:arr
                    })
                
                }
                console.log(arr[i].firstName)
                    console.log(arr[i].statu)
                    console.log(eid)
                    let user ={id:eid,
                        firstName:arr[i].firstName,
                        lastName:arr[i].lastName,
                        gender:arr[i].gender,
                        birthDate:arr[i].birthDate,
                        email:arr[i].email ,
                        password:arr[i].password,
                        comfirmPassword:arr[i].ConfirmPassword,
                        statu:arr[i].statu
                    }; 
                    ApiService.editUserStatu(user).then(res => {
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
           <h3> Welcome Admin</h3>
           
           <button type="button" className='btn btn-primary right' onClick={this.signOut}> Sign Out </button>     

          <table className='table table-hover striped m-5' border='1'>
              <tr>
              <th scope='col'>id </th>
                       <th scope='col'>FirstName </th>
                       <th scope='col'>LastName </th>
                       <th scope='col'>Gender</th>
                       <th scope='col'>Birthdate</th>
                       <th scope='col'>Email</th>
                       <th scope='col'>PassWord</th>
                       <th scope='col'>Statu</th>
                       </tr>
              <tbody>
                  {
              this.state.users.map( user =>
                               <tr key={user.id}>
                                   <td>{user.id}</td>
                                   <td>{user.firstName}</td>
                                   <td>{user.lastName}</td>
                                   <td>{user.gender}</td>
                                   <td>{user.birthDate}</td>
                                   <td>{user.email}</td>
                                   <td>{user.password}</td>
                               
                                    <td> <button onClick={this.check} value={user.id}>{user.statu} </button> </td>
                                   
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

export default AdminView
