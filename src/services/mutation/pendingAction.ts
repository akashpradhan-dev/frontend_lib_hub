import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BaseResponse } from '@/types/sharedTypes'
import api from '../../../utils/axiosConfig'

interface PendingActionRequest {
  libraryId: string
  action: 'approved' | 'rejected'
}

const PendingAction = async ({ libraryId, action }: PendingActionRequest) => {
  const response = await api.patch<BaseResponse>(
    `/v1/admin/library/${libraryId}/approve`,
    {
      action,
    },
  )
  return response.data
}

export const usePendingMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: PendingAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-libraries'] })
    },
  })
}
