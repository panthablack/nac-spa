export const wait = async (f: Function, timeout: number = 1000) =>
  new Promise(res => {
    setTimeout(() => {
      res(f())
    }, timeout)
  })
