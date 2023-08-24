import { HttpUtils } from '@uncover/js-utils'

export const useHeaders = (req: any, res: any, next: any) => {
  res.setHeader(
    HttpUtils.HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN,
    '*'
  )
  res.setHeader(
    HttpUtils.HttpHeader.ACCESS_CONTROL_ALLOW_HEADERS,
    [
      'Origin',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'Authorization'
    ].join(',')
  )
  res.setHeader(
    HttpUtils.HttpHeader.ACCESS_CONTROL_ALLOW_METHODS,
    [
      HttpUtils.HttpMethod.GET,
      HttpUtils.HttpMethod.POST,
      HttpUtils.HttpMethod.PUT,
      HttpUtils.HttpMethod.PATCH,
      HttpUtils.HttpMethod.DELETE,
      HttpUtils.HttpMethod.OPTIONS
    ].join(',')
  )
  return next()
}