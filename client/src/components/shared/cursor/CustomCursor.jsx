import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isLinkHovered, setIsLinkHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };

        const handleMouseOver = () => {
            setIsVisible(true);
        };

        const handleMouseOut = () => {
            setIsVisible(false);
        };

        const handleLinkMouseOver = () => {
            setIsLinkHovered(true);
        };

        const handleLinkMouseOut = () => {
            setIsLinkHovered(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('mouseover', handleLinkMouseOver);
            link.addEventListener('mouseout', handleLinkMouseOut);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
            links.forEach(link => {
                link.removeEventListener('mouseover', handleLinkMouseOver);
                link.removeEventListener('mouseout', handleLinkMouseOut);
            });
        };
    }, []);

    useEffect(() => {
        const cursor = document.querySelector('.custom-cursor');
        if (isVisible) {
            cursor.style.opacity = 1;
        } else {
            cursor.style.opacity = 0;
        }
    }, [isVisible]);

    return (
        <>
            <style>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        cursor: none;
                    }
                    html {
                        height: 100%;
                    }
                    body {
                        min-height: 100%;
                        font-family: 'Courier New';
                        overflow-x: hidden;
                    }
                    .custom-cursor {
                        position: fixed;
                        width: 50px;
                        height: 50px;
                        background-color: white;
                        border-radius: 50%;
                        pointer-events: none;
                        mix-blend-mode: difference;
                        transition: transform 350ms ease, opacity 0.3s ease;
                        transform: translate(-50%, -50%) scale(0.3);
                        z-index: 10000;
                        opacity: 0;
                    }
                    .custom-cursor--link {
                        transform: translate(-50%, -50%) scale(1);
                    }
                    @media (max-width: 1024px) {
                        .custom-cursor {
                            display: none;
                        }
                    }
                `}
            </style>
            <div
                className={`custom-cursor ${isLinkHovered ? 'custom-cursor--link' : ''}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
        </>
    );
};

export default CustomCursor;
