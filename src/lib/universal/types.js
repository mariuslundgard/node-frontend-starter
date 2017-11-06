type Request = {
  method: string,
  path: string,
  params: {
    [key: string]: string
  }
}

type Handler = (req: Request) => Promise

export type Route = {
  method: string,
  pattern: string,
  handler: Handler
}
