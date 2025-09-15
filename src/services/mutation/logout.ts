import { useMutation } from '@tanstack/react-query'
import api from '../../../utils/axiosConfig'

const logoutAction = async () => {
  const response = await api.post('/v1/auth/logout')
  return response.data
}

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: logoutAction,
  })
