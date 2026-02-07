"use client";

import { motion } from "framer-motion";
import {
    Facebook,
    Instagram,
    Linkedin,
    Megaphone,
    MapPin,
    BarChart3,
    Youtube,
    Calendar,
    Mail,
    Search,
    Globe,
    Palette,
    PenTool,
    Target
} from "lucide-react";

const icons = [
    { Icon: Instagram, color: "#E1306C", label: "Instagram" },
    { Icon: Linkedin, color: "#0077B5", label: "LinkedIn" },
    { Icon: Facebook, color: "#1877F2", label: "Facebook" },
    { Icon: Megaphone, color: "#F4B400", label: "Ads" },
    { Icon: MapPin, color: "#34A853", label: "Local" },
    { Icon: Youtube, color: "#FF0000", label: "YouTube" },
    { Icon: BarChart3, color: "#4285F4", label: "Analytics" },
    { Icon: Calendar, color: "#EA4335", label: "Strategy" },
    { Icon: Mail, color: "#EA4335", label: "Email" },
    { Icon: Search, color: "#4285F4", label: "SEO" },
    { Icon: Globe, color: "#34A853", label: "Web" },
    { Icon: Palette, color: "#9C27B0", label: "Branding" },
    { Icon: PenTool, color: "#5F6368", label: "Content" },
    { Icon: Target, color: "#FF6D01", label: "Conversion" },
];

export function FloatingIconsStrip() {
    return (
        <div className="flex w-full flex-wrap items-center justify-center gap-6 py-12 px-4">
            {icons.map((item, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -24, 0],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1, // Faster stagger
                    }}
                    className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#DADCE0] transition-all duration-300 hover:shadow-lg hover:ring-[#1A73E8]"
                >
                    <item.Icon
                        size={24}
                        color={item.color}
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                </motion.div>
            ))}
        </div>
    );
}
