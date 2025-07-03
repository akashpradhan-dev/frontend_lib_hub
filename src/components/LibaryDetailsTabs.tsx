import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ExternalLink } from 'lucide-react'
import { LibraryCardProps } from '@/types/sharedTypes'

export const LibaryDetailsTabs = ({ library }: LibraryCardProps) => {
  return (
    <>
      <Tabs defaultValue="overview">
        <TabsList className="bg-transparent backdrop-blur-sm border-slate-700/50 h-12">
          <TabsTrigger value="overview" className="text-md cursor-pointer">
            Overview
          </TabsTrigger>
          <TabsTrigger value="instalation" className="text-md cursor-pointer">
            Instalation
          </TabsTrigger>
          <TabsTrigger value="usage" className="text-md cursor-pointer">
            Usage
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-md cursor-pointer">
            Resources
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          className="p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl"
        >
          <h3 className={`text-xl font-semibold mb-4 `}>
            About {library?.name}
          </h3>
          <p className={`text-lg mb-6 text-gray-300`}>{library?.overview}</p>
          <h4 className={`text-lg font-semibold mb-3 `}>Key Features</h4>
          <ul className="space-y-2">
            {library?.features.map((feature: string, index: number) => (
              <li
                key={index}
                className={`flex items-center gap-2 text-gray-300`}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent
          value="instalation"
          className="p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl"
        >
          <div className={`bg-gray-900 rounded-lg p-4`}>
            <pre className={`text-sm text-gray-300`}>
              <code>{library?.installation}</code>
            </pre>
          </div>
        </TabsContent>
        <TabsContent
          value="usage"
          className="p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl"
        >
          <h3 className={`text-xl font-semibold mb-4 `}>Usage Example</h3>
          <div className={`bg-gray-900 rounded-lg p-4 overflow-x-auto`}>
            <pre className={`text-sm text-gray-300`}>
              <code>{library?.usage}</code>
            </pre>
          </div>
        </TabsContent>
        <TabsContent
          value="resources"
          className="p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl"
        >
          <h3 className={`text-xl font-semibold mb-4 `}>Resources</h3>
          <ul className="space-y-2">
            {library?.resources.map((resource, index) => (
              <a
                key={index}
                href={resource?.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 rounded-lg border transition-colors border-gray-700 hover:border-gray-600 hover:bg-gray-700`}
              >
                <ExternalLink className="w-5 h-5 text-blue-500" />
                <span>{resource?.name}</span>
              </a>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </>
  )
}
