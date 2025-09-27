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
import { useSaveLibraryMutation } from '@/services/mutation/user/addNewLibrary'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'
import { SingleSelect } from '@/components/SingleSelect'
import { useRouter } from 'next/navigation'
import {
  categoryOptions,
  frameworkOptions,
  languageOptions,
  libraryTypeOptions,
} from '@/constants/constant'
import { useGenerateExampleMutation } from '@/services/mutation/user/generateExample'
import { Spinner } from '@/components/Spinner'

/* ---------------- Schema ---------------- */
const librarySchema = z.object({
  name: z.string().min(1, 'Library name is required'),
  description: z.string().min(1, 'Description is required'),
  repositoryUrl: z
    .string('Enter a valid URL')
    .min(1, 'Repository URL is required'),
  homepageUrl: z.string('Enter a valid URL').optional().or(z.literal('')),
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
  const { mutate: generateExample, status: generateStatus } =
    useGenerateExampleMutation()
  const router = useRouter()
  const form = useForm<LibraryFormData>({
    resolver: zodResolver(librarySchema),
    defaultValues: {
      name: '',
      description: '',
      repositoryUrl: '',
      homepageUrl: '',
      exampleUsage: '',
      category: '',
      language: '',
      framework: '',
      libraryType: '',
    },
  })

  const onSubmit = (data: LibraryFormData) => {
    const payload = { ...data, createdBy: user?._id }
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

  const generateWithAI = async () => {
    const name = form.getValues('name')
    const description = form.getValues('description')

    if (!name) {
      toast.error('Please enter the library name first.')
      return
    }
    if (!description) {
      toast.error(
        'Please enter a brief description to help AI understand the context.',
      )
      return
    }

    generateExample(
      { name, description },
      {
        onSuccess: res => {
          if (res.status === 'success') {
            const data = res.data
            if (data) {
              try {
                // const parsed =
                //   typeof data === 'string' ? JSON.parse(data) : data
                if (data) {
                  form.setValue('exampleUsage', data)
                }
                toast.success('AI-generated content added!')
              } catch (e) {
                console.error('Failed to parse AI response:', e)
                toast.error('Failed to parse AI response. Please try again.')
              }
            } else {
              toast.error('AI response is empty. Please try again.')
            }
          }
        },
      },
    )
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

            {/* Example Usage */}
            <FormField
              control={form.control}
              name="exampleUsage"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between mb-1">
                    <FormLabel>Example Usage</FormLabel>
                    <Button
                      disabled={
                        generateStatus === 'pending' ||
                        form.watch('name').trim() === '' ||
                        form.watch('description').trim() === ''
                      }
                      variant="outline"
                      type="button"
                      onClick={generateWithAI}
                    >
                      Generate with AI
                      {generateStatus === 'pending' && (
                        <Spinner className="size-4" />
                      )}
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder={`import { Something } from 'library-name'\n\nfunction App() {\n  return <Something />\n}`}
                      rows={4}
                      {...field}
                      disabled={generateStatus === 'pending'}
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
