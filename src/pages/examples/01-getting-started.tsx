import Head from 'next/head'
import {useEffect, useRef} from "react";

export default function Example01() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.log('canvas is missing!');
            return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            console.log('context is missing!');
            return;
        }

        canvas.width = (window.innerWidth * 0.5);
        canvas.height = (window.innerHeight * 0.5);

        const {width, height} = canvas;

        let radius = 50;
        let dr = 1;

        const animate = () => {
            context.clearRect(0, 0, width, height);

            if (radius >= 50 || radius <= 20) {
                dr *= -1;
            }

            radius += dr;

            context.beginPath();
            context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
            context.fillStyle = '#333';
            context.fill();

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

    }, []);

    return (
        <>
            <Head>
                <title>Canvas animation - Next.js</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <style jsx>{`
              #my-canvas {
                border: 1px solid #999;
              }
            `}</style>
            <div>
                <h1>01 Getting Started</h1>
                <canvas ref={canvasRef} id="my-canvas"></canvas>
            </div>
        </>
    )
}