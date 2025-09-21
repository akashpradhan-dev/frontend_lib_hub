import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { SyntaxHighlight } from './SyntaxHighlight'
import { Library } from '@/types/sharedTypes'

interface LibaryDetailsTabsProps {
  library: Library
}

export const LibaryDetailsTabs = ({ library }: LibaryDetailsTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      {/* Tab Header */}
      <TabsList className="flex h-12 w-full justify-start gap-2 rounded-xl border bg-muted/50 p-1 backdrop-blur-sm">
        <TabsTrigger
          value="overview"
          className="flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="installation"
          className="flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          Usage
        </TabsTrigger>
        <TabsTrigger
          value="resources"
          className="flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          Resources
        </TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent
        value="overview"
        className="mt-6 rounded-xl border bg-card/80 p-6 shadow-sm backdrop-blur-sm"
      >
        <h3 className="mb-4 text-xl font-semibold">About {library?.name}</h3>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          {library?.description}
        </p>

        <h4 className="mb-3 text-lg font-semibold">Key Features</h4>
        {library?.exampleUsage ? (
          <SyntaxHighlight codeBlock={library.exampleUsage} />
        ) : (
          <p className="text-sm text-muted-foreground">No example provided.</p>
        )}
      </TabsContent>

      {/* Installation Tab */}
      <TabsContent
        value="installation"
        className="mt-6 rounded-xl border bg-card/80 p-6 shadow-sm backdrop-blur-sm"
      >
        {library?.exampleUsage ? (
          <SyntaxHighlight codeBlock={library.exampleUsage} />
        ) : (
          <p className="text-sm text-muted-foreground">No example provided.</p>
        )}
      </TabsContent>

      {/* Resources Tab */}
      <TabsContent
        value="resources"
        className="mt-6 rounded-xl border bg-card/80 p-6 shadow-sm backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4">
          {/* Homepage */}
          {library?.homepageUrl && (
            <div>
              <span className="block text-sm font-semibold text-foreground">
                Homepage
              </span>
              <a
                href={library.homepageUrl}
                target="_blank"
                className="mt-1 inline-block truncate rounded-md bg-muted px-3 py-1 text-sm text-blue-500 hover:underline"
              >
                {library.homepageUrl}
              </a>
            </div>
          )}

          {/* Repository */}
          {library?.repositoryUrl && (
            <div>
              <span className="block text-sm font-semibold text-foreground">
                Repository
              </span>
              <a
                href={library.repositoryUrl}
                target="_blank"
                className="mt-1 inline-block truncate rounded-md bg-muted px-3 py-1 text-sm text-blue-500 hover:underline"
              >
                {library.repositoryUrl}
              </a>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
