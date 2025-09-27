import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BaseResponse } from '@/types/sharedTypes'
import api from '@/utils/axiosConfig'
import { AxiosError } from 'axios'

interface EditLibRequest {
  name: string
  description: string
  repositoryUrl: string
  homepageUrl?: string
  exampleUsage?: string
  category: string
  language?: string
  framework?: string
  libraryType?: string
  id: string
}

const updateLibrary = async (payload: EditLibRequest) => {
  const response = await api.put<BaseResponse>(
    `/v1/user/my-library/${payload.id}`,
    payload,
  )
  return response.data
}

export const useUpdateLibraryMutation = () => {
  const queryclient = useQueryClient()

  return useMutation<
    BaseResponse,
    AxiosError<{ message: string }>,
    EditLibRequest
  >({
    mutationFn: updateLibrary,
    onSuccess: (_, variable) => {
      queryclient.invalidateQueries({
        queryKey: ['my-libraries'],
      })
      queryclient.invalidateQueries({
        queryKey: ['my-library-id', variable.id],
      })
    },
  })
}
