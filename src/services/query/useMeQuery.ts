import { queryOptions, useQuery } from '@tanstack/react-query'
import { User } from '@/services/mutation/login' // reuse your User type
import api from '@/utils/axiosConfig'
import { BaseResponse } from '@/types/sharedTypes'

interface MeResponse extends BaseResponse {
  data: User
}

const fetchMe = async () => {
  const response = await api.get<MeResponse>('/v1/auth/me', {
    withCredentials: true,
  })

  return response.data
}

export const useMeQueryOptions = ({ enabled }: { enabled?: boolean }) => {
  return queryOptions({
    queryKey: ['me'],
    queryFn: () => fetchMe(),
    staleTime: 1000 * 60 * 5,
    retry: 0,
    enabled,
  })
}

export const useMeQuery = ({ enabled }: { enabled: boolean }) => {
  return useQuery(useMeQueryOptions({ enabled }))
}
