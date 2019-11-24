import Application from './src/application'

const app = new Application()

app.use(async (ctx, next) => {
  console.log(1)
  await next()
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  console.log(next)

  await next()
  console.log(4)
})

app.use(async (ctx, next) => {
  console.log(5)
  console.log(next)

  await next()
  console.log(6)
})
app.use(async (ctx) => {
  console.log(7)

  ctx.res.end('Hello World!')
})
app.listen(3000)
