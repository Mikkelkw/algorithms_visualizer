import React, { Component } from 'react';
import './StartPage.css'
import Pathfinder from './pathfinder/Pathfinder';
import SortingVisualizer from './Sorting/SortingVisualizer/sortingVisualizer.jsx';
export default class StartPage extends Component {
    state = {
        on1: false,
        on2: false
    };
    toggle1 = () => {
        if(this.state.on1 != false){
            this.setState({on1: false});
        }
        else {
            this.setState({on1: true});
        }
    };
    toggle2 = () => {
        if(this.state.on2 != false){
            this.setState({on2: false});
        }
        else {
            this.setState({on2: true});
        }
    };

    render() {
        console.log(this.state.on)
        return (
            <div id="main">
                {this.state.on1 && <SortingVisualizer/>}
                {this.state.on2 && <Pathfinder/>}
                <div id="sorting"><button className="button1" onClick={this.toggle1}>Sorting</button></div>
                <div id="pathfinging"><button className="button1" onClick={this.toggle2}>Pathfinding</button></div>
            </div>
            
        );
    }
}




