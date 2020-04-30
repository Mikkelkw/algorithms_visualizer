import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations} from '../Algorithms/sortingAlgorithms.js';
import './sortingVisualizer.css';
import {getSelectionSortAnimations} from '../Algorithms/selectionSort'; 
import {getBubbleSortAnimations} from '../Algorithms/bubbleSort'; 


var f = [];
var timeouts = [];

var z=0
var NUMBER_OF_ARRAY_BARS = 10;
const PRIMARY_COLOR = 'blue';
const SECONDARY_COLOR = 'red';
const secondary = 'red'

//component used to render our sorting section
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    var mainLogo = require('C:/Users/i5/Documents/School/Senior project/algorithms_visualizer/src/Pictures/Beginner.PNG');
    var qs = require('C:/Users/i5/Documents/School/Senior project/algorithms_visualizer/src/Pictures/QuickSort1.PNG');
    var bubble = require('C:/Users/i5/Documents/School/Senior project/algorithms_visualizer/src/Pictures/BubbleSort.PNG')
    var merge = require('C:/Users/i5/Documents/School/Senior project/algorithms_visualizer/src/Pictures/MergeSort.PNG')
    var selections = require('C:/Users/i5/Documents/School/Senior project/algorithms_visualizer/src/Pictures/SelectionSort.PNG')
    this.state = {
      array: [],
      i: 0,
      imgList : [mainLogo, qs, bubble, merge, selections],
      values: 10,
      speed: 1
    }
    ;
  }

  //standard component for react
  componentDidMount() {
    this.resetArray();
  }

  //resets our array to a random state and clears timeouts
  resetArray() {
    this.cleartimeouts();
    this.setState({i:0})
    NUMBER_OF_ARRAY_BARS = this.state.values;
    f = []
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      f.push(randomIntFromInterval(1, 80));
    }
    this.setState({array: f});
    this.setState({index:0})
    
  }

  //clears all queued animations 
  cleartimeouts(){
    for (var i=0; i<timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
  }

  //Animates our selection sort
  selectionSort() {
    this.cleartimeouts();
    const animations = getSelectionSortAnimations(this.state.array)
    for (let i = 0; i < animations.length; i++) {
     
      const arrayBars = document.getElementsByClassName('array-bar')
      const [barOneIdx, barTwoIdx, swapIdx] = animations[i]
      if (swapIdx < 2) {
        const barTwo = arrayBars[barTwoIdx]
        const color = swapIdx % 2 === 0 ? secondary: PRIMARY_COLOR
        timeouts.push(setTimeout(() => {
            barTwo.style.backgroundColor = color
            if(i == animations.length-1){
              this.setState({i: 4});
            }
        }, i * this.state.speed));
      } else {
        timeouts.push(setTimeout(() => {
            if(swapIdx === 2) {
                const [barOneIdx, height1] = animations[i]
                const barOne = arrayBars[barOneIdx]
                barOne.style.height = `${height1}%`
                if(i == animations.length-1){
                  this.setState({i: 4});
                }
            } else {
                const [height2, barTwoIdx] = animations[i]
                const barTwo = arrayBars[barTwoIdx]
                barTwo.style.height = `${height2}%`
                if(i == animations.length-1){
                  this.setState({i: 4});
                }
            }
        }, i * this.state.speed));
      }
    }
    
}

//gets our quicksort and animates it
quicksort() {
  this.cleartimeouts();
  z = 1;
  const animations = getQuickSortAnimations(f);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const [barOneIdx, barTwoIdx,mode,c] = animations[i];
    const isColorChange = mode === 0;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx,mode,c] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = c === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      timeouts.push(setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        if(i == animations.length-1){
          this.setState({i: 1});
        }
      }, i * this.state.speed));
    } else {
      timeouts.push(setTimeout(() => {
        const [barOneIdx, newHeight,mode] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}%`;
        if(i == animations.length-1){
          this.setState({i: 1});
        }
      }, i * this.state.speed));
      
    }
    
    
  }
  
}


  //gets our bubblesort and animates it
  bubbleSort() {
    this.cleartimeouts();
    const animations = getBubbleSortAnimations(this.state.array)
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar')
        const [barOneIdx, barTwoIdx, swapIdx] = animations[i]
        if(swapIdx === 0) {
            const barOne = arrayBars[barOneIdx]
            const barTwo = arrayBars[barTwoIdx]
            timeouts.push(setTimeout(() => {
                barOne.style.backgroundColor = secondary
                barTwo.style.backgroundColor = secondary
                if(i == animations.length-1){
                  this.setState({i: 2});
                }
              }, i * this.state.speed));

              
        } else if(swapIdx === 2 || swapIdx === 3) {
          timeouts.push(setTimeout(() => {
                if(swapIdx === 2) {
                    const [barOneIdx, height1] = animations[i]
                    const barOne = arrayBars[barOneIdx]
                    barOne.style.height = `${height1}%`
                    if(i == animations.length-1){
                      this.setState({i: 2});
                    }
                } else {
                    const [height2, barTwoIdx] = animations[i]
                    const barTwo = arrayBars[barTwoIdx]
                    barTwo.style.height = `${height2}%`
                    if(i == animations.length-1){
                      this.setState({i: 2});
                    }
                }
            }, i * this.state.speed));
        } else {
            const barOne = arrayBars[barOneIdx]
            const barTwo = arrayBars[barTwoIdx]
            timeouts.push(setTimeout(() => {
                barOne.style.backgroundColor = PRIMARY_COLOR
                barTwo.style.backgroundColor = PRIMARY_COLOR
                if(i == animations.length-1){
                  this.setState({i: 2});
                }
            }, i * this.state.speed));
        }
    }
}

//called when changing the arraysize slider and updates our state to the new size
changeArraysize(size){
  this.setState({arraySize:size})
}

  //gets and animates our merge sort algorithm
  mergeSort() {
    this.cleartimeouts();
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          if(i == animations.length-1){
            this.setState({i: 3});
          }
        }, i * this.state.speed));
      } else {
        timeouts.push(setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}%`;
          if(i == animations.length-1){
            this.setState({i: 3});
          }
        }, i * this.state.speed));
      }
    }
  }


//gets expected width of our bars (changes based on size of array)
  getWidth(){
      var width = 30/this.state.values
    return width
  }

//handles change in array size
  handleChange = evt => {
    this.cleartimeouts();
    const values =evt.target.value;
 
    this.setState({values});

    this.resetArray();
  };
  handleSpeed = evt => {
    this.cleartimeouts();
    const speed =evt.target.value;
 
    this.setState({speed});

    this.resetArray();
  };

  //react component that renders everything for the user to see
  render() {
    
    const {array} = this.state;
    
    
    return (
      //our html components with react functions being called
      <div id="mainView">
      <div className="array-container">
        {array.map((value, idx) => (

          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}%`,
              width: `${this.getWidth()}vw`,
              margin: '.125%'
            }}>
            </div>
        ))}
        
        </div>
        <div>
          <div id="sortingButtons">
            
        <button class="sortingB" onClick={() => this.resetArray()}>Generate New Array</button>
        <button class="sortingB" onClick={() => this.quicksort()} >Quick Sort</button>
        <button class="sortingB" onClick={() => this.mergeSort()}>Merge Sort</button>
        <button class="sortingB" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button class="sortingB" onClick={() => this.selectionSort()}>Selection Sort</button>
        <button class="sortingB" onClick={() => window.location.reload(false)}>Log out</button>
        </div>
        <div>
        <input
              className="slider"
              id="changeSize"
              type="range"
              step={10}
              min={10}
              max={200}
              onChange={this.handleChange }
            />
            <label htmlFor=""> Array Size</label>
            </div>
            <div>
        <input
              className="slider"
              id="changeSize"
              type="range"
              step={0.05}
              min={0.01}
              max={150}
              onChange={this.handleSpeed}
            />
            <label htmlFor=""> Sorting Speed</label>
            </div>
          
        
        <div id="quickSort">
            <img src={this.state.imgList[this.state.i]} alt="algorithm"/>
          </div>
        </div>
      </div>
     
      
    );
    
  }
}

//basic function to get random ints
function randomIntFromInterval(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min);
}

