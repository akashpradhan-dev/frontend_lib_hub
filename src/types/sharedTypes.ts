export interface BaseResponse {
  status: string
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
}

export interface LibrariesResponse extends BaseResponse {
  data: Library[]
}
