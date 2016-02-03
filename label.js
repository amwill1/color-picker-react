var React = require('react');

var ColorLabel = React.createClass({
  propTypes: {
    handleClick: React.PropTypes.func.isRequired,
    color: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    isActive: React.PropTypes.bool
  },
  handleClick: function () {
    this.props.handleClick();
  },
  render: function () {
    var styles = {
      backgroundColor: this.props.color
    };
    return (
      <div>
        <button type='button'
                id={this.props.id}
                className={this.props.isActive ? 'active' : ''}
                style={styles}
                onClick={this.props.handleClick.bind(this, this.props.id)} />
      </div>
    );
  }
});

module.exports = ColorLabel;
