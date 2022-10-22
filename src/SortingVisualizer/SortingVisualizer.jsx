import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithims/sortingAlgorithms.js';
import './SortingVisualizer.css';

const animation_speed_ms = 3;

const number_of_array_bars = 300;

const primary_color = '#fca311';

const secondary_color = '#00f5d4';


export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        //storing array in state
        this.state = {
            array: [],
        };
    }
    //runs body when component first "loads"
    componentDidMount(){
        this.resetArray();
    }
    
    resetArray(){
        const array = [];
        //pushes 100 random values from 5-1000 into "array"
        for(let i = 0; i < number_of_array_bars; i++){
            array.push(randomIntFromInterval(5, 600));
        }
        //setting into state
        this.setState({array});
    }
    quickSort(){
        console.log("quick!")
    }
    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array_bar');
            //isColorChange = if i / 3 is odd
            const isColorChange = i % 3 !== 2;
                if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? secondary_color : primary_color;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * animation_speed_ms);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * animation_speed_ms);
            }
        }
    }
    bubbleSort(){
        console.log("bubble!")
    }
    heapSort(){
        console.log("heap!")
    }
    //defining array from state so we can map through it
    render() {
        const {array} = this.state;
        return(
        <div class = "container">
        <nav class="navbar navbar-light">
            <h1>Sorting Visualizer</h1>
            <div class = "button_group">
                <button class = "btn btn-secondary" onClick={() => this.bubbleSort()}type="button">Bubble Sort</button> -
                <button class = "btn btn-secondary" onClick={() => this.mergeSort()}type="button">Merge Sort</button> -
                <button class = "btn btn-secondary" onClick={() => this.quickSort()}type="button">Quick Sort</button> -
                <button class = "btn btn-secondary" onClick={() => this.heapSort()}type="button">Heap Sort</button>
            </div>
            <button type="reset" class="btn btn-success" onClick={() => this.resetArray()}>Reset Array</button>
        </nav>

            <div className = "array_container">
                {array.map((value, idx) =>(
                    <div
                    className = "array_bar"
                    key={idx}
                    style={{
                        backgroundColor: primary_color,
                        height: `${value}px`}}>
                    {/* {value} */}
                    </div>
                ))}
            </div>
        </div>
        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}