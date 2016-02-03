var React = require('react');
var ColorLabel = require('./label');
var ColorPicker = require('./picker');

var wB = 150;
var hB = 150;
var wS = 20;
var hS = 150;
var drag = false;
var rgbColor;

var ColorPickerContainer = React.createClass({
  propTypes: {
    isVisible: React.PropTypes.bool,
    defaultColor: React.PropTypes.string,
    id: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      isActive: this.props.isVisible || false,
      color: this.props.defaultColor || 'rgb(0, 0, 0)'
    };
  },
  togglePicker: function (id) {
    this.setState({isActive: !this.state.isActive});
  },
  blockFill: function () {
    this.ctxB.rect(0, 0, wB, hB);
    this.gradientBlock();
  },
  stripFill: function () {
    this.ctxS.rect(0, 0, wS, hS);
    var grd1 = this.ctxS.createLinearGradient(0, 0, 0, hS);
    grd1.addColorStop(0, 'rgb(255, 0, 0)'); // red
    grd1.addColorStop(0.17, 'rgb(255, 255, 0)'); // yellow
    grd1.addColorStop(0.34, 'rgb(0, 255, 0)'); // green
    grd1.addColorStop(0.51, 'rgb(0, 255, 255)'); // aqua
    grd1.addColorStop(0.68, 'rgb(0, 0, 255)'); // blue
    grd1.addColorStop(0.85, 'rgb(255, 0, 255)'); // magenta
    grd1.addColorStop(1, 'rgb(255, 0, 0)'); // red
    this.ctxS.fillStyle = grd1;
    this.ctxS.fill();
  },
  gradientBlock: function () {
    this.ctxB.fillStyle = rgbColor || this.props.defaultColor;
    this.ctxB.fillRect(0, 0, wB, hB);
    var grdWhite = this.ctxB.createLinearGradient(0, 0, wB, 0);
    grdWhite.addColorStop(0, 'rgb(255,255,255)');
    grdWhite.addColorStop(1, 'transparent');
    this.ctxB.fillStyle = grdWhite;
    this.ctxB.fillRect(0, 0, wB, hB);
    var grdBlack = this.ctxB.createLinearGradient(0, 0, 0, hB);
    grdBlack.addColorStop(0, 'transparent');
    grdBlack.addColorStop(1, 'rgb(0,0,0)');
    this.ctxB.fillStyle = grdBlack;
    this.ctxB.fillRect(0, 0, wB, hB);
  },
  selectColor: function (ctx, e, self) {
    var x = e.nativeEvent.offsetX;
    var y = e.nativeEvent.offsetY;
    var imageData = ctx.getImageData(x, y, 1, 1).data;
    rgbColor = 'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ')';
    self.setState({color: rgbColor});
  },
  clickStrip: function (e) {
    this.selectColor(this.ctxS, e, this);
    this.gradientBlock();
  },
  mouseDownBlock: function (e) {
    drag = true;
    this.selectColor(this.ctxB, e, this);
  },
  mouseMoveBlock: function (e) {
    if (drag) {
      this.selectColor(this.ctxB, e, this);
    }
  },
  mouseUpBlock: function () {
    drag = false;
  },
  setContexts: function (ctxB, ctxS) {
    this.ctxB = ctxB;
    this.ctxS = ctxS;
  },
  render: function () {
    var styles = {
      position: 'absolute'
    };
    return (
      <div style={styles}>
        <ColorLabel isActive={this.state.isActive}
                    color={this.state.color}
                    handleClick={this.togglePicker}
                    id='color-label' />
        <ColorPicker isVisible={this.state.isActive}
                     color={this.state.color}
                     setContexts={this.setContexts}
                     mouseDownBlock={this.mouseDownBlock}
                     mouseMoveBlock={this.mouseMoveBlock}
                     mouseUpBlock={this.mouseUpBlock}
                     clickStrip={this.clickStrip}
                     blockFill={this.blockFill}
                     stripFill={this.stripFill}
                     id='color-picker'
                     wB={wB}
                     hB={hB}
                     wS={wS}
                     hS={hS}
                     key={this.props.id} />
      </div>
    );
  }
});

module.exports = ColorPickerContainer;
