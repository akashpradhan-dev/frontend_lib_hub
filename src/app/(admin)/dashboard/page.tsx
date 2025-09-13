'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import React from 'react'
import Link from 'next/link'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        {/* Topbar */}
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Welcome back, {user?.name || 'Admin'} 👋
          </h2>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,245</p>
              <p className="text-sm text-slate-500">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Libraries Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">324</p>
              <p className="text-sm text-slate-500">12 pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">87</p>
              <p className="text-sm text-slate-500">+4 new today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$2,345</p>
              <p className="text-sm text-slate-500">+8% this week</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <Link href="/libraries/list/pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">45</p>
                <p className="text-sm text-slate-500">wating for your review</p>
              </CardContent>
            </Card>
          </Link>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
