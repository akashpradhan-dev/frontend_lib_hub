import { Code, Layers, Zap } from 'lucide-react'
import React from 'react'

const features = [
  {
    icon: Code,
    title: 'Developer Friendly',
    description:
      'Intuitive APIs and clear documentation to help developers save, share, and use packages effortlessly.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description:
      'High-quality packages optimized for speed and reliability across frontend, backend, and more.',
  },
  {
    icon: Layers,
    title: 'Modern & Versatile',
    description:
      'Supports the latest technologies and frameworks, making it easy to integrate into any project.',
  },
]

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose DevVault?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            DevVault is your all-in-one hub to save, share, and discover
            libraries and packages. Built for developers, by developers, it
            ensures high-quality, modern, and versatile tools for every project.
          </p>
        </div>

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
