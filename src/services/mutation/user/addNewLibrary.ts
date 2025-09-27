import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BaseResponse, Library } from '@/types/sharedTypes'
import api from '@/utils/axiosConfig'
import { AxiosError } from 'axios'

interface CreateLibRequest {
  name: string
  description: string
  repositoryUrl: string
  homepageUrl?: string
  exampleUsage?: string
  createdBy?: string
  category: string
  language?: string
  framework?: string
  libraryType?: string
}

interface SaveLibraryResponse extends BaseResponse {
  data: Library
}

const createLibrary = async (payload: CreateLibRequest) => {
  const response = await api.post<SaveLibraryResponse>(
    '/v1/user/library/save',
    payload,
  )
  return response.data
}

export const useSaveLibraryMutation = () => {
  const queryclient = useQueryClient()

  return useMutation<
    SaveLibraryResponse,
    AxiosError<{ message: string }>,
    CreateLibRequest
  >({
    mutationFn: createLibrary,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ['my-libraries'],
      })
    },
  })
}
