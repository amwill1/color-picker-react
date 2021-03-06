var React = require('react');

var ColorPicker = React.createClass({
  propTypes: {
    clickStrip: React.PropTypes.func.isRequired,
    mouseDownBlock: React.PropTypes.func.isRequired,
    mouseMoveBlock: React.PropTypes.func.isRequired,
    mouseUpBlock: React.PropTypes.func.isRequired,
    blockFill: React.PropTypes.func.isRequired,
    stripFill: React.PropTypes.func.isRequired,
    setContexts: React.PropTypes.func.isRequired,
    isVisible: React.PropTypes.bool.isRequired,
    wB: React.PropTypes.number,
    wS: React.PropTypes.number,
    hB: React.PropTypes.number,
    hS: React.PropTypes.number,
    id: React.PropTypes.string
  },
  componentDidMount: function () {
    var contexts = [];
    var self = this;
    var canvasB = this.refs.canvasBlock;
    var canvasS = this.refs.canvasStrip;
    var ctxB = canvasB.getContext('2d');
    var ctxS = canvasS.getContext('2d');
    contexts.push(ctxB, ctxS);
    self.props.setContexts(ctxB, ctxS);
    contexts.forEach(function (item) {
      self.props.blockFill(item);
      self.props.stripFill(item);
    });
  },
  render: function (e) {
    var styles = {
      display: this.props.isVisible ? 'block' : 'none',
      cursor: this.props.isVisible ? 'crosshair' : 'default',
      position: 'relative',
      left: '60px',
      top: '-22px',
      backgroundColor: 'white',
      height: '162px',
      width: '187px',
      border: 'solid 1px #ccc',
      padding: '5px'
    };
    var stripStyle = {
      marginLeft: '5px'
    };
    return (
      <div id={this.props.id} style={styles} className={this.props.id}>
        <canvas id='color-block'
                height={this.props.hB}
                width={this.props.wB}
                onMouseDown={this.props.mouseDownBlock}
                onMouseMove={this.props.mouseMoveBlock}
                onMouseUp={this.props.mouseUpBlock}
                ref='canvasBlock'></canvas>
        <canvas id='color-strip' style={stripStyle}
                height={this.props.hS}
                width={this.props.wS}
                onClick={this.props.clickStrip}
                ref='canvasStrip'></canvas>
      </div>
    );
  }
});

module.exports = ColorPicker;
