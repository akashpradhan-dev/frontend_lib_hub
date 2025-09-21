import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BaseResponse } from '@/types/sharedTypes'
import api from '@/utils/axiosConfig'

interface DeleteActionRequest {
  libraryId: string
}

const DeleteAction = async ({ libraryId }: DeleteActionRequest) => {
  const response = await api.delete<BaseResponse>(
    `/v1/user/my-library/${libraryId}`,
  )
  return response.data
}

export const useDeleteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: DeleteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-libraries'],
      })
    },
  })
}
