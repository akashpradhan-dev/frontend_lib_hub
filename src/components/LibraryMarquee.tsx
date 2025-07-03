// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';
import { Code } from 'lucide-react';

const libraries = [
    {
        name: "ReactFlow",
        category: "Visualization",
        description: "Build interactive node-based UIs with ease",
        stars: "18.2k",
        color: "from-blue-500 to-purple-600"
    },
    {
        name: "Framer Motion",
        category: "Animation",
        description: "Production-ready motion library for React",
        stars: "22.1k",
        color: "from-pink-500 to-red-500"
    },
    {
        name: "Chakra UI",
        category: "Components",
        description: "Modular and accessible React components",
        stars: "35.8k",
        color: "from-green-500 to-teal-500"
    },
    {
        name: "Three.js",
        category: "3D Graphics",
        description: "JavaScript 3D library for web",
        stars: "98.2k",
        color: "from-orange-500 to-yellow-500"
    },
    {
        name: "D3.js",
        category: "Data Viz",
        description: "Data-driven documents visualization",
        stars: "107k",
        color: "from-indigo-500 to-blue-500"
    },
    {
        name: "Lottie React",
        category: "Animation",
        description: "Render After Effects animations",
        stars: "2.8k",
        color: "from-purple-500 to-pink-500"
    }
];

function TestimonialCard({ name, category, description, stars, color }: (typeof libraries)[number]) {
    return (
        <Card className="w-64 group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-3 py-4 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
            <CardContent>
                <div className="flex items-center gap-2.5">
                    <div className="flex flex-col items-center justify-start">
                        <div className="flex items-center gap-2 text-lg font-semibold text-white">
                            <div className={`w-9 h-9 bg-gradient-to-r ${color} rounded-xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                                <Code className="w-6 h-6 text-white" />
                            </div>
                            {name}
                        </div>
                        <p className="text-xs font-medium text-muted-foreground mt-3">
                            {category} - {stars} stars
                        </p>
                    </div>
                </div>
                <blockquote className="mt-3 text-sm text-econdary-foreground truncate">{description}</blockquote>
            </CardContent>
        </Card>
    );
}

export default function LibraryMarquee() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center gap-1 overflow-hidden py-8">

            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Featured Libraries
            </h2>

            {/* Marquee moving left to right (default) */}
            <Marquee pauseOnHover repeat={3} className="[--duration:120s] whitespace-nowrap ">
                {libraries.map((review) => (
                    <TestimonialCard key={review.name} {...review} />
                ))}
            </Marquee>
            {/* Marquee moving right to left (reverse) */}
            <Marquee pauseOnHover reverse repeat={3} className="[--duration:120s]">
                {libraries.map((review) => (
                    <TestimonialCard key={review.name} {...review} />
                ))}
            </Marquee>

        </div>
    );
}
