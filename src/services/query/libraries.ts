import { queryOptions, useQuery } from '@tanstack/react-query'
import api from '../../../utils/axiosConfig'
import { BaseResponse, Library } from '@/types/sharedTypes'

interface LibraryResponse extends BaseResponse {
  data: Library[]
}

export const fetchLibraries = async () => {
  const response = await api.get<LibraryResponse>('/v1/libraries')
  return response.data
}

export const useLibrariesQueryOptions = () => {
  return queryOptions({
    queryKey: ['libraries'],
    queryFn: () => fetchLibraries(),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  })
}

export const useLibrariesQuery = () => {
  return useQuery(useLibrariesQueryOptions())
}
