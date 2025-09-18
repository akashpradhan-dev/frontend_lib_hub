import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/axiosConfig'

const logoutAction = async () => {
  const response = await api.post('/v1/auth/logout')
  return response.data
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-libraries'] })
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}
