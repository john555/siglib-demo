import React, { Component, Fragment } from 'react';
import SignaturePad from './SignaturePad';
import Siglib from './lib/siglib';

class App extends Component {

  startProcessing = () => {
    if (SignaturePad.data.length === 0) {
      this.canvas.width = 300;
      this.canvas.height = 150;
      return;
    }
    const siglibData = Siglib(SignaturePad.data, 10);
    this.canvas.width = siglibData.width;
    this.canvas.height = siglibData.height;
    
    siglibData.data.forEach(points => {
      this.drawPoints(points);
    });
    
  };

  componentDidMount() {
    this.canvas = document.getElementById('outputCanvas');
    this.ctx = this.canvas.getContext('2d');
  }
  /**
   * Renders points to a canvas and returns the canvas
   */

  drawPoints = (points) => {
    if (points.length === 0) {
      return;
    }

    this.ctx.arc(0, 0, 0.8, 0, 2 * Math.PI);
    this.ctx.fillStyle ='#000';
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(points[0].x, points[0].y, 0.8, 0, 2 * Math.PI);
    this.ctx.fill();
    
    if (points.length === 1) {
      return;
    }
    
    this.ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i += 1) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    
    this.ctx.stroke();
  };

  render() {
    return (
      <Fragment>
        <header className="appHeader">
          <h1 className="appTitle">Siglib demo</h1>
        </header>
        <main className="main">
          <div className="inputWrapper">
            <SignaturePad />
          </div>
          <button onClick={this.startProcessing} className="processButton">Process</button>
          <div className="outputWrapper">
            <canvas id="outputCanvas" />
          </div>
        </main>
      </Fragment>
    );
  }
}

export default App;
