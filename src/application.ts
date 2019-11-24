/* eslint-disable no-plusplus */
import * as http from 'http'
import context from './context'

interface ICtx {
    req: http.IncomingMessage,
    res: http.ServerResponse,
  }
// 启动方法
export default class Koa {
  middlewares: Function[] = []

  // next 是一个 async 函数, 不知道怎么写
  use(fn: (context: ICtx, next: Function) => any) {
    this.middlewares.push(fn)
  }

  listen(...args) {
    console.log('应用启动')
    http.createServer(this.createCtx).listen(...args)
  }

  getNext = (ctx: ICtx): Function => {
    let index = 0

    const next = () => {
      const fn = this.middlewares[index++]

      if (fn) {
        try {
          return Promise.resolve(fn(ctx, next))
        } catch (error) {
          return Promise.reject(error)
        }
      }

      return Promise.resolve()
    }

    return next
  }

  // 这俩是 node 本身自带的
  // 每次进来都 new 一下 ctx
  createCtx = async (request, response) => {
    const ctx = context(request, response)
    const fn = this.getNext(ctx)
    fn()
  }
}
