import { queryOptions, useQuery } from '@tanstack/react-query'
import api from '@/utils/axiosConfig'
import { BaseResponse, Library } from '@/types/sharedTypes'

interface LibraryRequest {
  category: string
}
interface LibraryResponse extends BaseResponse {
  data: Library[]
}

export const fetchLibraries = async ({ category }: LibraryRequest) => {
  const response = await api.get<LibraryResponse>('/v1/libraries', {
    params: { category },
  })
  return response.data
}

export const useLibrariesQueryOptions = ({ category }: LibraryRequest) => {
  return queryOptions({
    queryKey: ['libraries', category],
    queryFn: () => fetchLibraries({ category }),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  })
}

export const useLibrariesQuery = ({ category }: LibraryRequest) => {
  return useQuery(useLibrariesQueryOptions({ category }))
}
