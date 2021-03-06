import React from 'react';
import {render} from 'react-dom';

import {Box} from 'actives';
import connect from 'actives-react';

// pure logic, it means that logic does not know about view
class Counter {
    constructor() {
        this.counter = 0;
    }

    go() {
        setInterval(() => this.up(), 1000);
    }

    up() {
        this.counter++;
    }

    get() {
        return this.counter;
    }
}

// pure view, view does not know about logic at all
let CounterView = ({counter, onUp}) => {
    return <div><p>{counter}</p><button onClick={onUp}>up</button></div>
};


// let's make state for counter
let box = new Box;
// add counter to the box
box.add('counter', Counter);

// connect state to the counter
box.connect('counterState', 'counter')
    .state(({counter}) => {
        return {
            counter: counter.get()
        }
    })
    .actions(({counter}) => {
        return {
            onUp: () => counter.up()
        };
    });

// connect state with view, view should not know about real logic
let CounterWidget = connect(box.counterState, CounterView);

// render widget now it's connected to state. And it will react on changes.
render(<CounterWidget />, document.getElementById('app'));

// lets GO!
let counter = box.counter;
counter.go();

