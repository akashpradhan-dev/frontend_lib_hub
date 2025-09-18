import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BaseResponse, Library } from '@/types/sharedTypes'
import api from '@/utils/axiosConfig'

interface CreateLibRequest {
  name: string
  description: string
  repositoryUrl: string
  homepageUrl?: string
  tags?: string[]
  exampleUsage?: string
  createdBy: string | undefined
  category: string
}

interface SaveLibraryResponse extends BaseResponse {
  data: Library
}

const createLibrary = async ({
  name,
  description,
  repositoryUrl,
  homepageUrl,
  tags,
  exampleUsage,
}: CreateLibRequest) => {
  const response = await api.post<SaveLibraryResponse>(
    '/v1/user/library/save',
    {
      name,
      description,
      repositoryUrl,
      homepageUrl,
      tags,
      exampleUsage,
    },
  )
  return response.data
}

export const useSaveLibraryMutation = () => {
  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: createLibrary,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ['my-libraries'],
      })
    },
  })
}
