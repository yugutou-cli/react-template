export * from './login'
export * from './system'

export function testApi(data: Obj) {
  return alovaInstance.Post('/test', {
    test: 'wwwwj test api',
    ...data,
  })
}
