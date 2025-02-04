import { voidFun } from '../common'
export class Queue {
  private micro: Promise<void>
  private stack: any[] = []
  private isFlushing = false
  constructor() {
    // 默认认为有Promise，不考虑兼容老版本浏览器
    this.micro = Promise.resolve()
  }
  addFn(fn: voidFun): void {
    if (typeof fn !== 'function') return
    this.stack.push(fn)
    if (!this.isFlushing) {
      this.isFlushing = true
      this.micro.then(() => this.flushStack())
    }
  }
  flushStack(): void {
    const temp = this.stack.slice(0)
    this.stack.length = 0
    this.isFlushing = false
    for (let i = 0; i < temp.length; i++) {
      temp[i]()
    }
  }
}
