var contexts = [];
var wB = 150;
var hB = 150;
var wS = 20;
var hS = 150;
var drag = false;
var rgbColor = 'rgb(0,0,0)';

var ColorPickerContainer = React.createClass({
  getInitialState: function() {
    return {
      isPickerVisible: true,
      color: rgbColor
    };
  },
  togglePicker: function(id) {
    this.setState({isPickerVisible: !this.state.isPickerVisible});
  },
  blockFill: function() {
    this.ctxB.rect(0, 0, wB, hB);
    this.gradientBlock();
  },
  stripFill: function() {
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
  gradientBlock: function() {
    this.ctxB.fillStyle = rgbColor;
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
  selectColor: function(ctx, e, self) {
    var x = e.nativeEvent.offsetX;
    var y = e.nativeEvent.offsetY;
    var imageData = ctx.getImageData(x, y, 1, 1).data;
    rgbColor = 'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ')';
    self.setState({color: rgbColor});
  },
  clickStrip: function(e) {
    this.selectColor(this.ctxS, e, this);
    this.gradientBlock();
  },
  mouseDownBlock: function(e) {
    drag = true;
    this.selectColor(this.ctxB, e, this);
  },
  mouseMoveBlock: function(e) {
    if (drag) {
      this.selectColor(this.ctxB, e, this);
    }
  },
  mouseUpBlock: function() {
    drag = false;
  },
  setContexts: function(ctxB, ctxS) {
    this.ctxB = ctxB;
    this.ctxS = ctxS;
  },
  render: function() {
    return (
      <div>
        <ColorLabel isChecked={this.state.isPickerVisible}
                    color={this.state.color}
                    handleClick={this.togglePicker}
                    id={this.props.id} />
        <ColorPicker isVisible={this.state.isPickerVisible}
                     color={this.state.color}
                     setContexts={this.setContexts}
                     mouseDownBlock={this.mouseDownBlock}
                     mouseMoveBlock={this.mouseMoveBlock}
                     mouseUpBlock={this.mouseUpBlock}
                     clickStrip={this.clickStrip}
                     blockFill={this.blockFill}
                     stripFill={this.stripFill}
                     id={this.props.id} />
      </div>
    );
  }
});

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

var ColorPicker = React.createClass({
  getInitialState: function() {
    return {
      color: rgbColor
    }
  },
  componentDidMount: function() {
    var self = this;
    var canvasB = this.refs.canvasBlock;
    var canvasS = this.refs.canvasStrip;
    var ctxB = canvasB.getContext('2d');
    var ctxS = canvasS.getContext('2d');
    var idB = this.props.id + 'ctxB';
    var idS = this.props.id + 'ctxS';

    contexts.push({idB: ctxB, idS: ctxS});

    self.props.setContexts(ctxB, ctxS);

    contexts.forEach(function(item) {
      self.props.blockFill(item.idB);
      self.props.stripFill(item.idS);
    });
  },
  render: function(e) {
    var styles = {
      opacity: this.props.isVisible ? '1' : '0'
    };
    return(
      <div id="color-picker" style={styles} className={this.props.id}>
        <canvas id="color-block"
                height={hB}
                width={wB}
                onMouseDown={this.props.mouseDownBlock}
                onMouseMove={this.props.mouseMoveBlock}
                onMouseUp={this.props.mouseUpBlock}
                ref="canvasBlock"></canvas>
        <canvas id="color-strip"
                height={hS}
                width={wS}
                onClick={this.props.clickStrip}
                ref="canvasStrip"></canvas>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        {outputs.map(function(output) {
         return <ColorPickerContainer />
        })}
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('color-picker-container')
);
