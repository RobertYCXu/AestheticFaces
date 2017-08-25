import React from 'react';
import paper from 'paper';

class FaceLineEyes extends React.Component{
	componentDidMount(){
  	// Instantiate the paperScope with the canvas element
    var myCanvas = document.getElementById('myCanvas');
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
    console.log(myCanvas.height)

    paper.setup(myCanvas);

    // Draw a circle in the center
    var width = paper.view.size.width;
    var height = paper.view.size.height;

    var eye1_x = width/3;
    var eye1_y = height/3;
    var eye1_center = [eye1_x, eye1_y];
    var eye1_bounds_x = eye1_x;
    var eye1_bounds_y = eye1_y;
    var eye1_bounds_center = [eye1_bounds_x, eye1_bounds_y];
    var eye1_ellipse_h = 5;
    var eye1_ellipse_w = 30;
    var eye1_ellipse = [eye1_ellipse_w, eye1_ellipse_h];

    var eye2_x = 2*width/3;
    var eye2_y = height/3;
    var eye2_center = [eye2_x, eye2_y];
    var eye2_bounds_x = eye2_x;
    var eye2_bounds_y = eye2_y;
    var eye2_bounds_center = [eye2_bounds_x, eye2_bounds_y]
    var eye2_ellipse_h = 5;
    var eye2_ellipse_w = 30;
    var eye2_ellipse = [eye2_ellipse_w, eye2_ellipse_h];

    var eyebrowsUp = false;


    var pupil1 = new paper.Shape.Circle({
        center: eye1_bounds_center,
        fillColor: 'grey',
        radius: 10
    });
    var eye1 = new paper.Path.Line({
      from: [eye1_bounds_x-50, eye1_bounds_y-10],
      to: [eye1_bounds_x + 50, eye1_bounds_y-10],
      strokeColor: 'grey',
      strokeWidth: 10
    })

    var eye1_bounds = new paper.Shape.Ellipse({
      center: eye1_bounds_center,
      radius: eye1_ellipse
    })

    var eye2 = new paper.Path.Line({
      from: [eye2_bounds_x-50, eye2_bounds_y-10],
      to: [eye2_bounds_x + 50, eye2_bounds_y-10],
      strokeColor: 'grey',
      strokeWidth: 10
    })


    var pupil2 = new paper.Shape.Circle({
        center: eye2_bounds_center,
        fillColor: 'grey',
        radius: 10
    });

    var eye2_bounds = new paper.Shape.Ellipse({
      center: eye2_bounds_center,
      radius: eye2_ellipse
    })


    var rectangle = new paper.Rectangle(new paper.Point(eye1_x+200, eye1_y+200),new paper.Point(eye2_x-200, eye2_y+220))
    var cornersize = new paper.Size(15,15);
    var path = new paper.Path.RoundRectangle(rectangle, cornersize);
    path.strokeColor ='grey'
    path.strokeWidth = 10;


    // render
    paper.view.draw();
    paper.view.onFrame = function(e){
    	if(eyebrowsUp){
        eye1.bounds.centerY--;
      eye2.bounds.centerY--;
      }
    }
    console.log('eye1:' +eye1_center)
    console.log('eye2:' +eye2_center)

    var tool = new paper.Tool();
    tool.onMouseMove = function(e){
      let eye1_mouseX = e.point.x-eye1_bounds_x;
      let eye1_mouseY = e.point.y-eye1_bounds_y;
      let eye1_angle_rad = Math.atan(eye1_mouseY/eye1_mouseX);
      if(eye1_mouseX < 0 && eye1_mouseY > 0 || eye1_mouseX <0 && eye1_mouseY <0)
        eye1_angle_rad += Math.PI

      let eye1_angle_deg = eye1_angle_rad*(180/Math.PI)

      let eye2_mouseX = e.point.x-eye2_bounds_x;
      let eye2_mouseY = e.point.y-eye2_bounds_y;
      let eye2_angle_rad = Math.atan(eye2_mouseY/eye2_mouseX);
      if(eye2_mouseX < 0 && eye2_mouseY > 0 || eye2_mouseX <0 && eye2_mouseY <0)
        eye2_angle_rad += Math.PI

      let eye2_angle_deg = eye2_angle_rad*(180/Math.PI)

      if(eye1_bounds.contains(e.point))
        pupil1.position = e.point
      else{
        let radius = eye1_ellipse_h*eye1_ellipse_w/Math.sqrt(Math.pow(eye1_ellipse_w, 2)*Math.pow(Math.sin(eye1_angle_rad),2)+Math.pow(eye1_ellipse_h, 2)*Math.pow(Math.cos(eye1_angle_rad),2));
        let y = radius*Math.sin(eye1_angle_rad);
        let x = radius*Math.cos(eye1_angle_rad);
        pupil1.bounds.centerX = x+eye1_bounds_x;
        pupil1.bounds.centerY = y+eye1_bounds_y;
      }

      if(eye2_bounds.contains(e.point))
        pupil2.position = e.point
      else{
        let radius = eye2_ellipse_h*eye2_ellipse_w/Math.sqrt(Math.pow(eye2_ellipse_w, 2)*Math.pow(Math.sin(eye2_angle_rad),2)+Math.pow(eye2_ellipse_h, 2)*Math.pow(Math.cos(eye2_angle_rad),2));
        let y = radius*Math.sin(eye2_angle_rad);
        let x = radius*Math.cos(eye2_angle_rad);
        pupil2.bounds.centerX = x+eye2_bounds_x;
        pupil2.bounds.centerY = y+eye2_bounds_y;
      }
    }
    paper.view.onMouseDown = function(e){
      console.log(path)
      path.scale(1.01,1.01);
    }
    paper.view.onClick  = function(e){
      eyebrowsUp = true;
    }
  }

  getStyles(){
  	return {
  		position:'absolute',
  		width: '100%',
  		height: '100%',
      backgroundColor: 'yellow',
  		margin: 0,
  		padding:0,
      overFlow: 'hidden',
      zIndex: 2
  	}
  }
	render(){
		return <canvas style={this.getStyles()}id={this.props.id} data-paper-resize={true}> </canvas>
	}
}

export default FaceLineEyes