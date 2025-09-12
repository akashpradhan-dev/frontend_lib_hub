import { Code, Layers, Zap } from 'lucide-react'
import React from 'react'

const features = [
  {
    icon: Code,
    title: 'Developer Friendly',
    description:
      'Clean APIs and comprehensive documentation for rapid development.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description:
      "Optimized libraries that don't compromise on speed or bundle size.",
  },
  {
    icon: Layers,
    title: 'Modern Stack',
    description:
      'Built with TypeScript, React 18+, and the latest web standards.',
  },
]

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-16 bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Why Choose Our Collection?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group rounded-2xl border bg-card/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 text-purple-500 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>

                {/* Description */}
                <p className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
