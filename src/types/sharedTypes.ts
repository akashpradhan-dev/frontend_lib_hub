export interface BaseResponse {
  status: 'success' | 'failed'
  message: string
}

export interface Library {
  _id: string
  name: string
  description: string
  version: string
  repositoryUrl: string
  homepageUrl: string
  tags: string[]
  installation?: string
  exampleUsage: string
  status: string
  createdAt: string
  updatedAt: string
  liked?: boolean
  category?: string
  language?: string
  framework?: string
}

export interface LibrariesResponse extends BaseResponse {
  data: Library[]
}
