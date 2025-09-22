import { useMutation } from '@tanstack/react-query'
import { BaseResponse } from '@/types/sharedTypes'
import api from '@/utils/axiosConfig'

interface ExampleGenarateActionRequest {
  name: string
  description?: string
}

interface ExampleGenerateResponse extends BaseResponse {
  data: string
}

const ExampleGenerateAction = async ({
  name,
  description,
}: ExampleGenarateActionRequest) => {
  const response = await api.post<ExampleGenerateResponse>(
    '/v1/ai/get/example',
    {
      name,
      description,
    },
  )
  return response.data
}

export const useGenerateExampleMutation = () => {
  return useMutation({
    mutationFn: ExampleGenerateAction,
  })
}
