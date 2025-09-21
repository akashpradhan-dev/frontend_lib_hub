'use client'
import { useMutation } from '@tanstack/react-query'
import api from '@/utils/axiosConfig'
import { BaseResponse } from '@/types/sharedTypes'
import { User } from './login'

interface SignUpRequest {
  name: string
  email: string
  password: string
}

interface WithToken extends User {
  token: string
}

interface SignInResponse extends BaseResponse {
  data: WithToken
}

const signUpAction = async ({ name, email, password }: SignUpRequest) => {
  const response = await api.post<SignInResponse>('/v1/auth/register', {
    name,
    email,
    password,
  })
  return response.data
}

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: signUpAction,
  })
