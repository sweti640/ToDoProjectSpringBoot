
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';
import EditTask from './components/EditTask';
import AdminView from './components/AdminView';

// import React, { Component } from 'react'

// export class App extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//       isLogin:false
//     }
//   }
//   componentDidMount(){
//         const data=JSON.parse(localStorage.getItem('currentUser'))
//         console.log(data)
//         if(data==null){
//         this.setState({
//           isLogin:false
//         })
//         }else{
//           this.setState({
//             isLogin:true
//           })
          
//         }
        
//         }
  
//   render() {
//     if(!this.state.isLogin)
//     {
//     return (
//       <Route>
//         <div className="App">
//     <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//         <div className="container">
//           <Link className="navbar-brand" exact to="/">Home</Link>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/Login">Login</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/Registration">Registration</Link>
//               </li>
              
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="outer">
        
//           <Switch>
//             <Route exact path='/' component={Home} />
//              <Route path="/Login" component={Login} />
//              <Route path="/Registration" component={Registration} />
//              <Route path="/AddTask" component={AddTask} /> 
//              <Route path="/ShowTask" component={ShowTask} /> 
//              <Route path="/EditTask" component={EditTask} />
//              <Route path="/AdminView" component={AdminView} />   

//           </Switch>
        
//       </div>
      
//     </div>

//       </Route>
      
//     );
//   }
//   else{
//     <div className="App">
//     <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//         <div className="container">
//           <Link className="navbar-brand" exact to="/">Home</Link>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//             <ul className="navbar-nav ml-auto">
              
//               <li className="nav-item">
//                 <Link className="nav-link" to="/AddTask">AddTask</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/ShowTask">ShowTask</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="outer">
        
//           <Switch>
//             <Route exact path='/' component={Home} />
//              <Route path="/Login" component={Login} />
//              <Route path="/Registration" component={Registration} />
//              <Route path="/AddTask" component={AddTask} /> 
//              <Route path="/ShowTask" component={ShowTask} /> 
//              <Route path="/EditTask" component={EditTask} />
//              <Route path="/AdminView" component={AdminView} />   

//           </Switch>
        
//       </div>
      
//     </div>

//   }
// }
// }

// export default App





function App() {
  return (<Router>
    <div className="App">
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" exact to="/">Home</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Registration">Registration</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/AddTask">AddTask</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ShowTask">ShowTask</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
        
          <Switch>
            <Route exact path='/' component={Home} />
             <Route path="/Login" component={Login} />
             <Route path="/Registration" component={Registration} />
             <Route path="/AddTask" component={AddTask} /> 
             <Route path="/ShowTask" component={ShowTask} /> 
             <Route path="/EditTask" component={EditTask} />
             <Route path="/AdminView" component={AdminView} />   

          </Switch>
        
      </div>
      
    </div>
    </Router>
    
  );
}
export default App;


