'use client'
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PencilIcon, HeartIcon, Code } from 'lucide-react'
import { LikedLibraries } from '@/components/user/LikedLibraries'
import MyLibraries from '@/components/user/MyLibraries'
import { ProfileSection } from '@/components/user/ProfileSection'

// Dummy data
const dummyUser = {
  name: 'Akash Pradhan',
  email: 'akash@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=3',
  bio: 'Frontend developer passionate about React and modern UI design.',
  myLibraries: [
    {
      _id: '1',
      name: 'React Quick Start',
      description: 'Starter template for React projects with TailwindCSS',
      tags: ['React', 'Tailwind', 'Starter'],
      repositoryUrl: '#',
      homepageUrl: '#',
      exampleUsage: 'npm install react-quick-start',
    },
    {
      _id: '2',
      name: 'NextJS UI Kit',
      description: 'Collection of reusable NextJS components',
      tags: ['NextJS', 'UI', 'Components'],
      repositoryUrl: '#',
      homepageUrl: '#',
      exampleUsage: 'npm install nextjs-ui-kit',
    },
  ],
  likedLibraries: [
    {
      _id: '3',
      name: 'Framer Motion',
      description: 'Motion library for React',
      tags: ['React', 'Animation', 'Motion'],
      repositoryUrl: '#',
      homepageUrl: '#',
      exampleUsage: 'npm install framer-motion',
    },
  ],
}

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
          <TabsTrigger
            value="profile"
            className="p-4 rounded-lg hover:bg-slate-200/30 dark:hover:bg-slate-700/30"
          >
            <PencilIcon className="inline w-4 h-4 mr-2" /> Profile Settings
          </TabsTrigger>
        </TabsList>

        {/* My Libraries */}
        <TabsContent value="my-libs">
          {tab === 'my-libs' && <MyLibraries />}
        </TabsContent>

        {/* Liked Libraries */}
        <TabsContent value="liked-libs">
          {tab === 'liked-libs' && <LikedLibraries />}
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent
          value="profile"
          className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl space-y-4"
        >
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Edit Profile
          </h2>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                defaultValue={dummyUser.name}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={dummyUser.email}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Bio
              </label>
              <textarea
                defaultValue={dummyUser.bio}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-pink-500"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200"
            >
              Save Changes
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UserProfilePage
