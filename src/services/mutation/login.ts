import { useMutation } from '@tanstack/react-query'
import api from '@/utils/axiosConfig'
import { BaseResponse } from '@/types/sharedTypes'

interface SignInRequest {
  email: string
  password: string
}

export interface User {
  _id?: string
  email: string
  name: string
  role: 'admin' | 'user'
}

interface WithToken extends User {
  token: string
}

interface SignInResponse extends BaseResponse {
  data: WithToken
}

const signInAction = async ({ email, password }: SignInRequest) => {
  const response = await api.post<SignInResponse>('/v1/auth/login', {
    email,
    password,
  })
  return response.data
}

export const useLogInMutation = () =>
  useMutation({
    mutationFn: signInAction,
  })
