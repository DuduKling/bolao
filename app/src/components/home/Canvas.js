import React, { useEffect, useRef } from 'react';
import '../../css/home/canvas.css';

function Canvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        updateCanvas();
    }, []);

    const updateCanvas = () => {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');
        const scale = 1.5;
        canvas.width = 1200 * scale;
        canvas.height = 800 * scale;

        const numPentagons = 10;

        function pentagon(x, y, radius, rotation) {
            for (let i = 0; i < 5; i++) {
                const ang = (i / 5) * Math.PI * 2 + rotation;
                ctx.lineTo(
                    Math.cos(ang) * radius + x,
                    Math.sin(ang) * radius + y,
                );
            }
            ctx.closePath();
        }

        for (let i = 0; i <= numPentagons; i++) {
            const randPosX = Math.floor(Math.random() * canvas.width);
            const randPosY = Math.floor(Math.random() * canvas.height);
            const ranSize = Math.floor(Math.random() * 100) + 50;
            const randRotate = Math.floor(Math.random() * 10);

            ctx.beginPath();
            pentagon(randPosX, randPosY, ranSize, randRotate);
            ctx.strokeStyle = '#424242';
            ctx.stroke();
        }
    };

    return (
        <canvas ref={canvasRef} className="home-canvas"></canvas>
    );
}

export default Canvas;
