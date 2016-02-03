var React = require('react');
var ReactDOM = require('react-dom');
var ColorPickerContainer = require('./colorpicker.js');

var App = React.createClass({
  render: function () {
    return <div>
      <div className='picker1'>
        <h2>Picker 1</h2>
        <ColorPickerContainer id='picker1' defaultColor='rgb(255, 0, 0)' />
        <p>Lorem ipsum content here</p>
      </div>
      <div className='picker2'>
        <h2>Picker 2</h2>
        <ColorPickerContainer id='picker2' defaultColor='rgb(0, 0, 255)' />
      </div>
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('color-picker-container')
);
