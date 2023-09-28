import NavBarComponent from '@/components/navbar-component';
import Head from 'next/head'
import {useEffect, useRef, useState} from "react";

export default function Example02() {
    const [isAnimating, setIsAnimating] = useState(false);
    const [canvas, setCanvas] = useState<HTMLCanvasElement|null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D|null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef(0);
    let radiusRef = useRef(50);
    let dr = 1;

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = (window.innerWidth * 0.5);
            canvas.height = (window.innerHeight * 0.5);
            setCanvas(canvas);
            setContext(ctx);
        }
    }, []);

    const animate = () => {
        let radius = radiusRef.current;

        if (!canvas || !context) {
            return;
        }

        const {width, height} = canvas;

        context.clearRect(0, 0, width, height);

        if (radius >= 50 || radius <= 20) {
            dr *= -1;
        }

        radius += dr;
        radiusRef.current = radius;

        context.beginPath();
        context.fillStyle = '#333';
        context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
        context.fill();

        animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleAnimation = () => {
        setIsAnimating(prev => !prev);
        if (!animationFrameRef.current) {
            animate();
        } else {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = 0;
        }
    };

    return (
        <>
            <Head>
                <title>Canvas animation - Next.js</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <NavBarComponent/>
            <div>
                <h1>02 Start Stop</h1>
                <div>
                    <canvas ref={canvasRef} className='border'></canvas>
                </div>
                <button onClick={handleAnimation}>{isAnimating ? 'STOP' : 'START'}</button>
            </div>
        </>
    )
}
