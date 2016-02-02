import {ColorPickerContainer} from './container';

var App = React.createClass({
  render: function() {
    return <ColorPickerContainer />
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
