'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { SingleSelect } from '@/components/SingleSelect'
import { useRouter } from 'next/navigation'

const categoryOptions = [
  { key: 'FrontEnd', name: 'Frontend' },
  { key: 'Backend', name: 'Backend' },
  { key: 'Mobile', name: 'Mobile' },
  { key: 'DevOps', name: 'DevOps' },
]

const languageOptions = [
  { key: 'JavaScript', name: 'JavaScript' },
  { key: 'TypeScript', name: 'TypeScript' },
  { key: 'Python', name: 'Python' },
  { key: 'Java', name: 'Java' },
  { key: 'C#', name: 'C#' },
  { key: 'Go', name: 'Go' },
  { key: 'Ruby', name: 'Ruby' },
  { key: 'PHP', name: 'PHP' },
  { key: 'C++', name: 'C++' },
  { key: 'Other', name: 'Other' },
]

const frameworkOptions = [
  { key: 'React', name: 'React' },
  { key: 'Angular', name: 'Angular' },
  { key: 'Vue.js', name: 'Vue.js' },
  { key: 'Svelte', name: 'Svelte' },
  { key: 'Node.js', name: 'Node.js' },
  { key: 'NestJS', name: 'NestJS' },
  { key: 'Django', name: 'Django' },
  { key: 'Flask', name: 'Flask' },
  { key: 'FastAPI', name: 'FastAPI' },
  { key: 'Spring Boot', name: 'Spring Boot' },
  { key: 'Ruby on Rails', name: 'Ruby on Rails' },
  { key: 'Laravel', name: 'Laravel' },
  { key: 'Other', name: 'Other' },
]

const libraryTypeOptions = [
  { key: 'UI Library', name: 'UI Library' },
  { key: 'State Management', name: 'State Management' },
  { key: 'Form Handling', name: 'Form Handling' },
  { key: 'Styling', name: 'Styling' },
  { key: 'Animation', name: 'Animation' },
  { key: 'Testing', name: 'Testing' },
  { key: 'Database', name: 'Database' },
  { key: 'Auth', name: 'Auth' },
  { key: 'Utility', name: 'Utility' },
  { key: 'Build Tool', name: 'Build Tool' },
  { key: 'Other', name: 'Other' },
]

/* ---------------- Schema ---------------- */
const librarySchema = z.object({
  name: z.string().min(1, 'Library name is required'),
  description: z.string().min(1, 'Description is required'),
  repositoryUrl: z
    .string('Enter a valid URL')
    .min(1, 'Repository URL is required'),
  homepageUrl: z.string('Enter a valid URL').optional().or(z.literal('')),
  tags: z.string().optional(),
  exampleUsage: z.string().optional(),
  category: z.string({
    message: 'Please select an email to display.',
  }),
  language: z.string().optional(),
  framework: z.string().optional(),
  libraryType: z.string().optional(),
})

type LibraryFormData = z.infer<typeof librarySchema>

export default function AddNew() {
  const { user } = useAuth()
  const { mutate, status } = useSaveLibraryMutation()
  const router = useRouter()
  const form = useForm<LibraryFormData>({
    resolver: zodResolver(librarySchema),
    defaultValues: {
      name: '',
      description: '',
      repositoryUrl: '',
      homepageUrl: '',
      tags: '',
      exampleUsage: '',
      category: '',
      language: '',
      framework: '',
      libraryType: '',
    },
  })

  const tags = form
    .watch('tags')
    ?.split(',')
    .map(tag => tag.trim())
    .filter(Boolean)

  const onSubmit = (data: LibraryFormData) => {
    const payload = { ...data, tags, createdBy: user?._id }
    mutate(payload, {
      onSuccess: () => {
        form.reset()
        toast.success('Library added successfully')
        router.push('/user/libraries/my-libraries')
      },
      onError: error => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again.'
        toast.error(message)
        console.log(error)
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
                    {tags?.map((tag, idx) => <Badge key={idx}>{tag}</Badge>)}
                  </div>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <FormControl>
                    <SingleSelect
                      placeholder="Select a Category"
                      selectLabel="Categories"
                      items={categoryOptions}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language *</FormLabel>
                  <FormControl>
                    <SingleSelect
                      placeholder="Select a Language"
                      selectLabel="Language"
                      items={languageOptions}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="framework"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Framework</FormLabel>
                  <FormControl>
                    <SingleSelect
                      placeholder="Select a Framework"
                      selectLabel="Frameworks"
                      items={frameworkOptions}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="libraryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Library Type</FormLabel>
                  <FormControl>
                    <SingleSelect
                      placeholder="Select a Type"
                      selectLabel="Types"
                      items={libraryTypeOptions}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={status === 'pending'}
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
