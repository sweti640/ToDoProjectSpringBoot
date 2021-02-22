import React, { Component } from 'react'
import ApiService from '../Service/ApiService';

export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username:'',
            password:''
             
        }
        this.checkUserValid=this.checkUserValid.bind(this);
    }
    onchange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    checkUserValid = (e )=> {
        e.preventDefault();
        
       var email=this.state.username
        var password=this.state.password
        console.log(email+""+password)
        ApiService.fatchLoginUser(email,password).then(res=>{
            console.log(res);
            const keys = Object.keys(res.data);
            console.log(keys)
            const values = Object.values(res.data);
            if(values=="activeted")
            {
                console.log("login successfully...")
                alert("login successfully....")
                localStorage.setItem("currentUser",email);
                this.props.history.push('/AddTask')

            }
            else if(values=="deactiveted")
            {
                console.log("you deactive");
                alert("you r deactivated by Admin");
            }
            else if(values=="admin")
            {
                console.log("admin")
                alert("Welcome Admin");
                this.props.history.push('/AdminView')
            }
            
            
        }).catch(error=>{
        console.log(error);
        alert("check your username and password....")
        console.log("check your username and password....")
        
    })
}


    
    render() {
        return (
            <form className="linner">

            <h3>Log In</h3>

            <div className="form-group">
                <label>Email</label>
                <input type="email" name='username'  value={this.state.username} onChange={this.onchange}  className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password"  name='password'  value={this.state.password}  onChange={this.onchange} className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>
            
            <button type="submit" className="btn btn-dark btn-block" onClick={this.checkUserValid}>Sign in</button>
            <p className="forgot-password text-right">
            Don't have an account? <a href="Registration">Create One</a>
            </p>
        </form>
        )
    }
}

export default Login
