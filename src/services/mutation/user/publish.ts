import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BaseResponse } from '@/types/sharedTypes'
import api from '@/utils/axiosConfig'

interface PublishActionRequest {
  libraryId: string
  action: 'publish'
}

const PublishAction = async ({ libraryId, action }: PublishActionRequest) => {
  const response = await api.patch<BaseResponse>(
    `/v1/user/my-library/publish/${libraryId}`,
    {
      action,
    },
  )
  return response.data
}

export const usePublishMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: PublishAction,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['my-librrary-id', variables.libraryId],
      })
    },
  })
}
