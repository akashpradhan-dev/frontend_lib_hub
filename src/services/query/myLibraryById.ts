import { queryOptions, useQuery } from '@tanstack/react-query'
import api from '@/utils/axiosConfig'
import { BaseResponse, Library } from '@/types/sharedTypes'

interface LibraryResponse extends BaseResponse {
  data: Library
}
interface MyLibrariesByIdRequest {
  id: string
}

export const fetchLibraries = async ({ id }: MyLibrariesByIdRequest) => {
  const response = await api.get<LibraryResponse>(`/v1/user/my-library/${id}`)
  return response.data
}

export const useMyLibrariesByIdQueryOptions = ({
  id,
}: MyLibrariesByIdRequest) => {
  return queryOptions({
    queryKey: ['my-librrary-id', id],
    queryFn: () => fetchLibraries({ id }),
    staleTime: 1000 * 60 * 5,
    retry: 0,
    // enabled: !!id,
  })
}

export const useMyLibraryByIdQuery = ({ id }: MyLibrariesByIdRequest) => {
  return useQuery(useMyLibrariesByIdQueryOptions({ id }))
}
