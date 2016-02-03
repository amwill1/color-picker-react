# color-picker-react

A canvas RGB color picker built with ReactJS.

## [DEMO](http://amwill1.github.io/color-picker-react/)

![picker image](./picker.png)

## Install

`npm install color-picker-react --save`

## Usage

    var React = require('react');
    var ColorPicker = require('color-picker-react');

    var App = React.createClass({
      render: function() {
        return <ColorPicker defaultColor='rgb(255, 0, 0)' isVisible='true' />;
      }
    });

    ReactDOM.render(
      <App />,
      document.getElementById('color-picker')
    );

The `defaultColor` and `isVisible` options are not required; they default to `rgb(0, 0, 0)` and `false`

You can also have more than one picker

    var App = React.createClass({
      render: function() {
        return <div>
          <ColorPicker defaultColor='rgb(255, 0, 0)' />;
          <ColorPicker defaultColor='rgb(0, 0, 255)' />;
        </div>
      }
    });
