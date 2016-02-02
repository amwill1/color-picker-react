var React = require('react');
var ReactDOM = require('react-dom');

var ColorLabel = React.createClass({
  handleClick: function() {
    this.props.handleClick();
  },
  render: function() {
    var styles = {
      backgroundColor: this.props.color
    };
    return(
      <div>
        <button type='button' id='color-label' className={this.props.id} style={styles} onClick={this.props.handleClick.bind(this, this.props.id)}  />
      </div>
    );
  }
});

module.exports = ColorLabel;
