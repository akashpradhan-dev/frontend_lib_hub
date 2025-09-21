import { queryOptions, useQuery } from '@tanstack/react-query'
import api from '@/utils/axiosConfig'
import { BaseResponse, Library } from '@/types/sharedTypes'

interface LibraryResponse extends BaseResponse {
  data: Library[]
}

export const fetchLibraries = async () => {
  const response = await api.get<LibraryResponse>('/v1/user/my-library')
  return response.data
}

export const useMyLibrariesQueryOptions = () => {
  return queryOptions({
    queryKey: ['my-libraries'],
    queryFn: () => fetchLibraries(),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  })
}

export const useMyLibrariesQuery = () => {
  return useQuery(useMyLibrariesQueryOptions())
}
