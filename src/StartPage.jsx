import React, { Component } from 'react';
import './StartPage.css'
import Pathfinder from './pathfinder/Pathfinder';
import SortingVisualizer from './Sorting/SortingVisualizer/sortingVisualizer.jsx';

//main startpage to render our components

export default class StartPage extends Component {
    state = {
        on1: false,
        on2: false,
        logintext:"Login to your account",
        textColor: " #5d5d5d",
        login: true,
        newAcc: false,
        response: '',
        uname: '',
        pass: '',
        newuname:'',
        pass2:'1',
        pass3:'2',
        responseToPost: false,
        choice: false
    };
    
    //handles create new account event
    createNewAccount = (event) =>{
        
        this.setState({newAcc:!this.state.newAcc, login:!this.state.login, logintext:"Insert new account details", textColor:"#5d5d5d"})
    };

    //standard react component to prevent re-rendering
    componentDidMount() {
        document.title = "Algorithm visualizer"
        this.callApi()
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
      }
      callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
      };

      //handles submission of username and password when logging in
      handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uname: this.state.uname, pass: this.state.pass})
        });
        const body = await response.text();
        
        this.setState({ responseToPost: body });
        this.handleLoginResponse(this.state.responseToPost)
      };

      //handles respone from above post request
    handleLoginResponse(test){
        var response = test
        console.log(response)
        if(response === 'true'){
            this.setState({login:false, choice:true});
        }else{
            this.setState({logintext:"Wrong email or password. Please try again", textColor:"red"})
            
        }
    }

    //handles new account creation and default failure in creation process
    newAccount = async e => {
        e.preventDefault();
        var pass2 = this.state.pass2;
        var pass3 = this.state.pass3;
        console.log("Fires")
        if(pass2 != pass3){
            this.setState({logintext:"Passwords do not match", textColor:"red"}) 
        }else{
        const response = await fetch('/api/newUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uname: this.state.newuname, pass: this.state.pass2})
          });
          const body = await response.text();
          
          this.setState({ responseToPost: body , login:true, newAcc:false});
          this.handleNewAccResponse(this.state.responseToPost)
        };   
    };

    //handles the response from our post request
    handleNewAccResponse(test){
        var response = test
        if(response === 'true'){
            this.setState({login:true, choice:false, logintext:"Account created, you can now log in"});
        }else{
            this.setState({logintext:"Email already in the system", textColor:"red"})
            
        }
    }
    //toggle1 and toggle2 changes between our  pathfinding and sorting components
    toggle1 = () => {
        if(this.state.on1 != false){
            this.setState({on1: false});
        }
        else {
            this.setState({on1: true});
            if(this.state.on2 == true){
                this.setState({on2: false});
            }
        }
    };
    toggle2 = () => {
        if(this.state.on2 != false){
            this.setState({on2: false});
        }
        else {
            this.setState({on2: true});
            if(this.state.on1 == true){
                this.setState({on1: false});
            }
        }
    };
    
    
    render() {
        
        return (
            <div id="main">
            {this.state.login && (<div class="log-form">
              <h2 style={{color:this.state.textColor}}>{this.state.logintext}</h2>
              <form onSubmit={this.handleSubmit}>
                <input name="email"type="email" title="username" placeholder="Email"  onChange={e => this.setState({ uname: e.target.value, })}/>
                <input name="password" type="password" title="username" placeholder="Password" onChange={e => this.setState({ pass: e.target.value })}/>
                <button type="submit" class="btn" >Login</button>
                <a class="forgot" href="#" onClick={this.createNewAccount}>Create account</a>
              </form>
            </div>)}
            {this.state.newAcc && (<div class="log-form">
            <h2 style={{color:this.state.textColor}}>{this.state.logintext}</h2>
              <form onSubmit={this.newAccount}>
                <input name="email"type="email" title="username" placeholder="Email"  onChange={e => this.setState({ newuname: e.target.value })}/>
                <input name="password" type="password" title="username" placeholder="Password" onChange={e => this.setState({ pass2: e.target.value })}/>
                <input name="password" type="password" title="username" placeholder="Repeat Password" onChange={e => this.setState({ pass3: e.target.value })}/>
                <button type="submit" class="btn" >Submit</button>
                <a class="forgot" href="#" onClick={this.createNewAccount}>Back</a>
              </form>
            </div>)}

                {this.state.on1 && <SortingVisualizer/>}
                {this.state.on2 && <Pathfinder/>}
                {this.state.choice && (<div id="sorting"><button className="button1" onClick={this.toggle1}>Sorting</button></div>)}
                {this.state.choice && (<div id="pathfinging"><button className="button1" onClick={this.toggle2}>Pathfinding</button></div>)}
            </div>
            
        );
    }
}




