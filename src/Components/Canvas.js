import { createSvgIcon } from '@material-ui/core';
import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


//create react functional component with canvas
function Canvas() {
    const canvasRef = React.useRef(null);
    // usestate for canvas state
    const [canvasState, setCanvasState] = useState();

    // draw circles on canvas with cursor click
    const drawCircle = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#0095ff';
        ctx.fill();


    }

    // draw white diamonds on canvas state with mousemove
    useEffect(() => {
        // make white canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setCanvasState(ctx);

    }, [canvasState]);


    return (
        <div
            style={{
                textAlign: 'center',
            }}>
            <canvas
                id="canvas"
                ref={canvasRef}
                width={500}
                height={500}
                onClick={drawCircle}
                style={{
                    border: '2px solid #FFF',
                    marginTop: 10,
                }}
            ></canvas>
        </div>
    );
}

export default Canvas;