export interface LibraryResource {
  name: string
  url: string
}

export interface Library {
  id: number
  name: string
  description: string
  logo: string
  tags: string[]
  stars: number
  github: string
  overview: string
  features: string[]
  installation: string
  usage: string
  resources: LibraryResource[]
}

export interface LibraryCardProps {
  library: Library
}
