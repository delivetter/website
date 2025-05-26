import { cn } from "@/lib/utils";
import React from "react";

interface AvatarWithTextProps {
    imgSrc: string;
    upperText: string;
    className?: string;
}

export default function AvatarWithText({
    imgSrc,
    upperText,
    className,
}: AvatarWithTextProps) {
    return (
        <div className="relative aspect-square w-44">
            <svg viewBox="0 0 200 200" className="absolute w-full h-full z-10">
                <defs>
                    <path
                        id="circlePath"
                        d="M100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                        fill="none"
                    />
                    <linearGradient
                        id="textGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="#3b82f6" />{" "}
                        {/* blue-500 */}
                        <stop offset="100%" stopColor="#8b5cf6" />{" "}
                        {/* purple-500 */}
                    </linearGradient>
                </defs>
                <text
                    fontSize="26"
                    className="font-no-seven"
                    fill="url(#textGradient)"
                    letterSpacing="1"
                >
                    <textPath
                        href="#circlePath"
                        startOffset="25%"
                        textAnchor="middle"
                    >
                        {upperText}
                    </textPath>
                </text>
            </svg>

            {/* Circular avatar */}
            <div className="absolute inset-[16%] w-[68%] h-[68%]">
                <img
                    src={imgSrc}
                    alt={upperText}
                    className={cn(
                        "rounded-full object-cover w-full h-full",
                        className
                    )}
                />
            </div>
        </div>
    );
}
