import { queryOptions, useQuery } from '@tanstack/react-query'
import api from '../../../utils/axiosConfig'
import { BaseResponse, Library } from '@/types/sharedTypes'

interface LibraryResponse extends BaseResponse {
  data: Library[]
}

export const fetchLikedLibraries = async () => {
  const response = await api.get<LibraryResponse>('/v1/user/liked-library')
  return response.data
}

export const useLikedLibrariesQueryOptions = () => {
  return queryOptions({
    queryKey: ['liked-libraries'],
    queryFn: () => fetchLikedLibraries(),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  })
}

export const useLikedLibrariesQuery = () => {
  return useQuery(useLikedLibrariesQueryOptions())
}
