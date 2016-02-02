var contexts = [];
var wB = 150;
var hB = 150;
var wS = 20;
var hS = 150;
var drag = false;
var rgbColor = 'rgb(0,0,0)';

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
