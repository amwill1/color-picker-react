var React = require('react');
var ReactDOM = require('react-dom');
var ColorPickerContainer = require('./colorpicker.js');

var App = React.createClass({
  render: function() {
    return <ColorPickerContainer />;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('color-picker-container')
);
