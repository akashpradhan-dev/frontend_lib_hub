'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useSignUpMutation } from '@/services/mutation/signup'
import Cookie from 'js-cookie'

const signupSchema = z
  .object({
    name: z.string().min(2, { message: 'Name is required' }),
    email: z.string().email({ message: 'Enter valid email' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm your password' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type Inputs = z.infer<typeof signupSchema>

export default function SignupPage() {
  const { login } = useAuth()
  const router = useRouter()

  const { mutate, isPending } = useSignUpMutation()

  const form = useForm<Inputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: Inputs) => {
    mutate(
      { name: data.name, email: data.email, password: data.password },
      {
        onSuccess: response => {
          const { token, ...user } = response.data
          login(user)

          Cookie.set('token', token, { expires: 7 })

          toast.success('Signup successful 🎉')
          router.push('/user/profile')
        },
        onError: () => {
          toast.error('Signup failed, try again')
        },
      },
    )
  }

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login/google`
  }

  return (
    <section className="flex min-h-[90vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white/70 dark:bg-black/70 backdrop-blur-xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Create Your DevVault Account
        </h2>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>Enter your account email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a strong password (6+ characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>Re-enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02]"
              disabled={isPending}
            >
              {isPending ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-slate-300 dark:border-slate-700" />
          <span className="mx-3 text-sm text-slate-500 dark:text-slate-400">
            or
          </span>
          <div className="flex-grow border-t border-slate-300 dark:border-slate-700" />
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full py-3 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-3 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        >
          Continue with Google
        </button>
      </div>
    </section>
  )
}
