import { queryOptions, useQuery } from '@tanstack/react-query'
import api from '@/utils/axiosConfig'
import { BaseResponse, Library } from '@/types/sharedTypes'

interface PendingLibraryResponse extends BaseResponse {
  data: Library[]
}

export const fetchPendingListLibraries = async () => {
  const response = await api.get<PendingLibraryResponse>(
    '/v1/admin/libraries/pending-list',
  )
  return response.data
}

export const usePendingLibrariesQueryOptions = () => {
  return queryOptions({
    queryKey: ['pending-libraries'],
    queryFn: () => fetchPendingListLibraries(),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  })
}

export const usePendingLibrariesQuery = () => {
  return useQuery(usePendingLibrariesQueryOptions())
}
