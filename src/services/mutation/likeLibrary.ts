import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BaseResponse } from '@/types/sharedTypes'
import api from '@/utils/axiosConfig'

interface LikeRequest {
  libraryId: string
  liked: boolean
}

const LikeAction = async ({ libraryId, liked }: LikeRequest) => {
  const response = await api.put<BaseResponse>('/v1/user/like', {
    libraryId,
    liked,
  })
  return response.data
}

export const useLikeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LikeAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liked-libraries'] })
      queryClient.invalidateQueries({ queryKey: ['libraries'] })
    },
  })
}
