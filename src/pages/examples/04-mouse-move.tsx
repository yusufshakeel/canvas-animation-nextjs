import NavBarComponent from '@/components/navbar-component';
import Head from 'next/head'
import {useEffect, useRef, useState} from "react";

export default function Example04() {
    const [isAnimating, setIsAnimating] = useState(false);
    const [canvas, setCanvas] = useState<HTMLCanvasElement|null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D|null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef(0);
    const radius = 20;
    let ballPositionRef = useRef({x:0, y:0});

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const bound = canvas?.getBoundingClientRect();
            if (!canvas || !bound) {
                return;
            }
            const x = event.clientX - bound.left - canvas.clientLeft;
            const y = event.clientY - bound.top - canvas.clientTop;
            ballPositionRef.current = {x, y};
        };

        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = (window.innerWidth * 0.5);
            canvas.height = (window.innerHeight * 0.5);
            ballPositionRef.current = {x: canvas.width / 2, y: canvas.height / 2};
            canvas.addEventListener('mousemove', handleMouseMove);
            setCanvas(canvas);
            setContext(ctx);
        }

        return () => {
            canvas?.removeEventListener('mousemove', handleMouseMove);
        };
    }, [canvas]);

    const animate = () => {
        if (!canvas || !context) {
            return;
        }

        const {width, height} = canvas;
        const {x, y} = ballPositionRef.current;

        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.fillStyle = '#333';
        context.arc(x, y, radius, 0, 2 * Math.PI);
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
                <h1>04 Mouse move</h1>
                <div>
                    <canvas ref={canvasRef} className='border'></canvas>
                </div>
                <button onClick={handleAnimation}>{isAnimating ? 'STOP' : 'START'}</button>
            </div>
        </>
    )
}
