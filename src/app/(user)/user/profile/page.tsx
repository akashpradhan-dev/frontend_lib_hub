'use client'
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { HeartIcon, Code } from 'lucide-react'
import { LikedLibraries } from '@/components/user/LikedLibraries'
import MyLibraries from '@/components/user/MyLibraries'
import { ProfileSection } from '@/components/user/ProfileSection'

const UserProfilePage = () => {
  const [tab, setTab] = useState('my-libs')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <ProfileSection />

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="bg-transparent border h-12 border-slate-300 dark:border-slate-700 mb-6 justify-center gap-4">
          <TabsTrigger
            value="my-libs"
            className="p-4 rounded-lg hover:bg-slate-200/30 dark:hover:bg-slate-700/30"
          >
            <Code className="inline w-4 h-4 mr-2" /> My Libraries
          </TabsTrigger>
          <TabsTrigger
            value="liked-libs"
            className="p-4 rounded-lg hover:bg-slate-200/30 dark:hover:bg-slate-700/30"
          >
            <HeartIcon className="inline w-4 h-4 mr-2" /> Liked Libraries
          </TabsTrigger>
          {/* <TabsTrigger
            value="profile"
            className="p-4 rounded-lg hover:bg-slate-200/30 dark:hover:bg-slate-700/30"
          >
            <PencilIcon className="inline w-4 h-4 mr-2" /> Profile Settings
          </TabsTrigger> */}
        </TabsList>

        {/* My Libraries */}
        <TabsContent value="my-libs">
          {tab === 'my-libs' && <MyLibraries />}
        </TabsContent>

        {/* Liked Libraries */}
        <TabsContent value="liked-libs">
          {tab === 'liked-libs' && <LikedLibraries />}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UserProfilePage
