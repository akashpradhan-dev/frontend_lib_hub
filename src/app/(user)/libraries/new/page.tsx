'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSaveLibraryMutation } from '@/services/mutation/addNewLibrary'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

type LibraryFormData = {
  name: string
  description: string
  version: string
  repositoryUrl: string
  homepageUrl: string
  tags: string
  exampleUsage: string
}

export default function AddNew() {
  const { user } = useAuth()
  const { mutate, status } = useSaveLibraryMutation()
  const form = useForm<LibraryFormData>({
    defaultValues: {
      name: '',
      description: '',
      version: '1.0',
      repositoryUrl: '',
      homepageUrl: '',
      tags: '',
      exampleUsage: '',
    },
  })

  const tags = form
    .watch('tags')
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)

  const onSubmit = (data: LibraryFormData) => {
    const userId = user?._id
    const payload = { ...data, tags, createdBy: userId }
    mutate(payload, {
      onSuccess: () => {
        form.reset({
          name: '',
          description: '',
          version: '1.0',
          repositoryUrl: '',
          homepageUrl: '',
          tags: '',
          exampleUsage: '',
        })
        toast.success('library added successfully')
      },
      onError: error => {
        console.log(error)
        toast.error('Something went wrong')
      },
    })
  }

  return (
    <section className="flex min-h-[90vh] items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Submit a New Library
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              rules={{ required: 'Library name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Library Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React Query" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Repository URL */}
            <FormField
              control={form.control}
              name="repositoryUrl"
              rules={{
                required: 'Repository URL is required',
                pattern: {
                  value: /^https?:\/\/.+$/,
                  message: 'Enter a valid URL',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository URL *</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Link to the GitHub repository
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Homepage URL */}
            <FormField
              control={form.control}
              name="homepageUrl"
              rules={{
                pattern: {
                  value: /^https?:\/\/.+$/,
                  message: 'Enter a valid URL',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Homepage URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="react, state-management" {...field} />
                  </FormControl>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, idx) => (
                      <Badge key={idx}>{tag}</Badge>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {/* Example Usage */}
            <FormField
              control={form.control}
              name="exampleUsage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example Usage</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`import { Something } from 'library-name'\n\nfunction App() {\n  return <Something />\n}`}
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={status == 'pending'}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02]"
            >
              {status === 'pending' ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
