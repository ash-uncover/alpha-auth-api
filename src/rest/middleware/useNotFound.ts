import { HttpUtils } from '@uncover/js-utils'

export const useNotFound = function (req: any, res: any, next: any) {
  res.status(HttpUtils.HttpStatus.NOT_FOUND).send('<h1>NOT FOUND</h1>')
}