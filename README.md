# ReactJS Actives counter example. 
There is an example with reactjs view.

### How to start
- `npm install`
- `npm start`
- `http://localhost:8080/` [http://localhost:8080/](http://localhost:8080/)


There are some required packages.
```javascript
import React from 'react';
import {render} from 'react-dom';

import {Box} from 'actives';
import connect from 'actives-react';
```
Pure logic and view.
```javascript
// pure logic, it means that logic does not know about view
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
```

Make box and define state.
```javascript
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
```

Connect state/actions to the view and render.
```javascript
// connect state with view, view should not know about real logic
let CounterWidget = connect(box.counterState, CounterView);

// render widget now it's connected to state. And it will react on changes.
render(<CounterWidget />, document.getElementById('app'));
```

You can manipulate `counter` (logic instance). And it will present view.
```javascript
// lets GO!
let counter = box.counter;
counter.go();
```

### actives
The main idea of [actives](https://github.com/slavahatnuke/actives)
