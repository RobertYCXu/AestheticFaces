import React from 'react';
import paper from 'paper'
import Canvas from './canvas/Canvas'
import FaceLineEyes from './canvas/FaceLineEyes'

class App extends React.Component {

  render() {
    return <FaceLineEyes id='myCanvas' data-paper-resize></FaceLineEyes>
  }
}

export default App;
