"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function StarBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;
        let centerX = width / 2;
        let centerY = height / 2;

        const PARTICLE_COUNT = 450;
        const BASE_SPEED = 0.2;

        class Particle {
            x: number;
            y: number;
            size: number;
            color: string;
            angle: number;
            radius: number; // Distance from center
            velocity: number;
            angularVelocity: number;

            constructor(randomizePos = true) {
                this.angle = Math.random() * Math.PI * 2;
                const maxDist = Math.max(width, height) * 0.8;
                this.radius = randomizePos
                    ? Math.random() * maxDist
                    : maxDist + Math.random() * 100;

                this.x = centerX + Math.cos(this.angle) * this.radius;
                this.y = centerY + Math.sin(this.angle) * this.radius;

                this.size = Math.random() * 2 + 0.5;
                const opacity = Math.random() * 0.6 + 0.2;
                this.color = `rgba(0, 0, 0, ${opacity})`;

                this.velocity = (Math.random() * 0.5 + 0.5) * BASE_SPEED;
                this.angularVelocity = (Math.random() * 0.002 + 0.001);
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Spiral motion - Accelerate inwards
                const inwardSpeed = this.velocity * (1 + (1200 / (this.radius + 100)));
                this.radius -= inwardSpeed;

                // Rotation/Swirl
                const rotationSpeed = this.angularVelocity * (1 + (600 / (this.radius + 100)));
                this.angle += rotationSpeed;

                this.x = centerX + Math.cos(this.angle) * this.radius;
                this.y = centerY + Math.sin(this.angle) * this.radius;

                if (this.radius < 50) {
                    this.respawnAtEdge();
                }
            }

            respawnAtEdge() {
                this.angle = Math.random() * Math.PI * 2;
                this.radius = Math.max(width, height) * 0.8;
                this.x = centerX + Math.cos(this.angle) * this.radius;
                this.y = centerY + Math.sin(this.angle) * this.radius;
                this.velocity = (Math.random() * 0.5 + 0.5) * BASE_SPEED;
            }
        }

        const init = () => {
            particles = [];
            width = window.innerWidth;
            height = window.innerHeight;
            centerX = width / 2;
            centerY = height / 2;
            canvas.width = width;
            canvas.height = height;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle(true));
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            init();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>

            {/* Galaxy Center Graphic */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "800px",
                height: "800px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: -1
            }}>
                {/* Rotating Nebula - Layer 1 (Dark Violet) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: "absolute",
                        width: "700px",
                        height: "700px",
                        borderRadius: "40%", // Irregular shape
                        background: "radial-gradient(circle at 30% 30%, rgba(40, 0, 80, 0.4), transparent 60%), radial-gradient(circle at 70% 70%, rgba(20, 0, 60, 0.4), transparent 60%)",
                        filter: "blur(80px)",
                    }}
                />

                {/* Rotating Nebula - Layer 2 (Deep Indigo/Black Swirl) */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 80,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: "absolute",
                        width: "600px",
                        height: "600px",
                        borderRadius: "45%",
                        background: "conic-gradient(from 0deg, transparent 0%, rgba(10, 5, 20, 0.1) 20%, rgba(0,0,0,0.4) 40%, transparent 60%, rgba(20, 0, 40, 0.2) 80%, transparent 100%)",
                        filter: "blur(60px)",
                    }}
                />

                {/* Galaxy Core (Singularity) - Pulsing */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: "absolute",
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, #000000 0%, rgba(20, 0, 40, 0.8) 40%, transparent 80%)",
                        filter: "blur(30px)", // Blurred core as requested
                        zIndex: 2
                    }}
                />
            </div>

            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );
}
