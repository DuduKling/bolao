import React, { Component } from 'react';
import '../../css/home/canvas.css'

class Canvas extends Component {
    componentDidMount() {
        this.updateCanvas();
    }
    
    updateCanvas() {
        const canvas = this.refs.canvas;
        const ctx = this.refs.canvas.getContext('2d');
        const scale = 1.5;
        canvas.width = 1200 * scale;
        canvas.height = 800 * scale;

        const numPentagons = 10;

        function pentagon(x, y, radius, rotation){
            for(var i = 0; i < 5; i ++){
                const ang = (i / 5) * Math.PI * 2 + rotation;
                ctx.lineTo(
                    Math.cos(ang) * radius + x,
                    Math.sin(ang) * radius + y
                );
                }
            ctx.closePath();
        }

        for(var i = 0; i <= numPentagons; i ++){
            var randPosX = Math.floor(Math.random() * canvas.width);
            var randPosY = Math.floor(Math.random() * canvas.height);
            var ranSize = Math.floor(Math.random() * 100) + 50;
            var randRotate = Math.floor(Math.random() * 10);
            // var randRotate = -Math.PI / 2;
            
            ctx.beginPath();
            pentagon(randPosX, randPosY, ranSize, randRotate);
            ctx.strokeStyle="#424242";
            ctx.stroke();
        }
        
    }

    render() {
        return (
            <canvas ref="canvas" className="home-canvas"></canvas>
        );
    }
}

export default Canvas;