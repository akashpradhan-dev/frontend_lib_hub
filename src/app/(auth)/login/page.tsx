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
// import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLogInMutation } from '@/services/mutation/login'

/* ---------- Validation Schema ---------- */
const loginSchema = z.object({
  email: z
    .email({
      message: 'Enter valid email',
    })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(2, { message: 'Password is required' }),
})

type Inputs = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { login } = useAuth()

  const { mutate, isPending } = useLogInMutation()
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: Inputs) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: response => {
          const { role } = response.data

          if (role === 'admin') {
            router.replace('/dashboard')
          } else {
            router.push('/profile')
          }

          login(response.data)

          toast.success('login success')
        },
        onError: () => {
          toast.error('something went wrong, try again')
        },
      },
    )
  }

  const handleGoogleLogin = () => {
    // Point this to your backend route
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login/google`
  }

  return (
    <section className="flex min-h-[90vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Login to DevVolt
        </h2>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    Enter your account password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02]"
              disabled={isPending}
            >
              {isPending ? 'sign in....' : 'Sign In'}
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

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-3 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        >
          Continue with Google
        </button>

        {/* Extra links */}
        {/* <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Don’t have an account?{' '}
          <Link
            href="/register"
            className="text-purple-500 hover:text-pink-500 font-medium"
          >
            Sign up
          </Link>
        </div> */}
      </div>
    </section>
  )
}
