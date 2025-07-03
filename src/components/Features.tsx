import { Code, Layers, Zap } from 'lucide-react'
import React from 'react'

const features = [
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Developer Friendly',
    description:
      'Clean APIs and comprehensive documentation for rapid development',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Performance First',
    description:
      "Optimized libraries that don't compromise on speed or bundle size",
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Modern Stack',
    description: 'Built with TypeScript, React 18+, and latest web standards',
  },
]

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Why Choose Our Collection?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
