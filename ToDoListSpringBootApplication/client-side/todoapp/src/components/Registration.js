import React, { Component } from 'react'
import ApiService from '../Service/ApiService';

export class Registration extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            FirstName: '',
            LastName:'',
            Gender:'',
            BirthDate:'',
            Email: '',
            Password: '',
            dateerror:'',
            ConfirmPassword: '',
            firstnameError:'',
            lastnameError:'',
            emailError:'',
            passwordError:'',
            cpasswordError:'',
            message: null
             
        }
        this.onRadioChange = this.onRadioChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }
    onchange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onRadioChange = (e) => {
        this.setState({
            Gender: e.target.value
        });
      }

      validForm = () => {
          var fdate=new Date(this.state.BirthDate);
          var fyear=fdate.getFullYear();
        var today = new Date();
         var yyyy = today.getFullYear();
         
        var isValid = true
      
        if(yyyy-fyear<18)
        {
            alert("small")
            this.setState({dateerror:"user mast be 18+"})
            isValid = false;
        }
        else if(yyyy-fyear>18)
        {
            this.setState({ dateerror: "" });
            isValid = true;
        }
        
        if (this.state.FirstName.length === 0 || !this.state.FirstName.match(/^[A-Za-z]+$/) ) {
            this.setState({ firstnameError: "Firstname Should Not Be Blank & contain only alphabet" });
            isValid = false;
        }
        else if (this.state.FirstName.length > 0) {
            this.setState({ firstnameError: "" });
            isValid = true;
        }
       
        
        if (this.state.LastName.length === 0 ||!this.state.LastName.match(/^[A-Za-z]+$/)) {
            this.setState({ lastnameError: "lastname Should Not Be Blank & must contain only alphabet" });
            isValid = false;
        }
        else if (this.state.LastName.length > 0) {
            this.setState({ lastnameError: "" });
            isValid = true;
        }
        // if(this.state.BirthDate.getUTCFullYear()  )
        

        if (!this.state.Email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            this.setState({ emailError: "Email should contain . and @" });
            isValid = false;
        }
        else if (this.state.Email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            this.setState({ emailError: "" });
            isValid = true;
        }
        if (!this.state.Password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
            this.setState({
                passwordError: `password should conatin atleast 1 capital 1 special 
            character and minimum length of 8` });
            isValid = false;
        } 
        else if (this.state.Password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
            this.setState({ passwordError: "" });
            isValid = true;
        }
        if (this.state.Password != this.state.ConfirmPassword) {
            this.setState({ cpasswordError: "Password And Confirm Password Not Match" })
            isValid = false;
        } 
        else if (this.state.Password != this.state.ConfirmPassword) {
            this.setState({ cpasswordError: "" })
            isValid = true;
        }
        return isValid;
    }
     

      saveUser = (e) => {
        e.preventDefault();
        const validForm = this.validForm()
        
        let user ={firstName:this.state.FirstName,
            lastName:this.state.LastName,
            gender:this.state.Gender,
            birthDate:this.state.BirthDate,
            email:this.state.Email ,
            password:this.state.Password,
           
            statu:"activeted"};
        //alert(JSON.stringify(user));
        if (validForm == true) {
        console.log(user);
        ApiService.addUser(user).then(res => {
                console.log(res);
            const keys = Object.keys(res.data);
            console.log(keys)
            const values = Object.values(res.data);
            if(values=="Email exits")
            {
                alert("Email is allready avlibale")
            }
            else if(values=="Done"){
               this.setState({message : 'User added successfully.'});
                alert(this.state.message)
                 this.props.history.push('/Login');
            }
            });
        }
    }

    
    render() {
        return (
            <div>
                <form className="rinner">
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name='FirstName' value={this.state.FirstName} onChange={this.onchange} className="form-control" placeholder="First name" />
                    <pre style={{ color: 'red' }}> {this.state.firstnameError}</pre>
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" name='LastName' value={this.state.LastName} onChange={this.onchange} className="form-control" placeholder="Last name" />
                    <pre style={{ color: 'red' }}> {this.state.lastnameError}</pre>
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <ul>
                <li>
              <label>
                <input
                  type="radio"
                  value="male"
                  checked={this.state.Gender ==="male"}
                  onChange={this.onRadioChange}
                />
                <span>Male</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={this.state.Gender ==="female"}
                  onChange={this.onRadioChange}
                />
                <span>Female</span>
              </label>
            </li>
            </ul>
            </div>
                <div className="form-group">
                    <label>Birthdate</label>
                    <input type="date" name='BirthDate' value={this.state.BirthDate} onChange={this.onchange} placeholder="birthdate" className="form-control"  />
                    <pre style={{ color: 'red' }}> {this.state.dateerror}</pre>
                </div>
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name='Email' value={this.state.Email} onChange={this.onchange}  required className="form-control" placeholder="Enter email" />
                    <pre style={{ color: 'red' }}> {this.state.emailError}</pre>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name='Password' value={this.state.Password} onChange={this.onchange} placeholder='Password' required className="form-control" placeholder="Enter password" />
                    <pre style={{ color: 'red' }}> {this.state.passwordError}</pre>
                </div>
                <div className="form-group">
                    <label>ConfirmPassword</label>
                    <input type="password" name='ConfirmPassword' value={this.state.ConfirmPassword} onChange={this.onchange} className="form-control" placeholder="Enter email" />
                    <pre style={{ color: 'red' }}> {this.state.cpasswordError}</pre>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.saveUser}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="Login">log in?</a>
                </p>
            </form>
                
            </div>
        )
    }
}

export default Registration
