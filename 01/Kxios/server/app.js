const Koa = require('koa');
const KoaRouter = require('koa-router');
const app = new Koa();

const router = new KoaRouter();

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
} );

router.get('/data', async ctx => {
    return ctx.body = {
        x: 1,
        y: 2
    }
})

app.use( router.routes() );

app.listen(7777);