import app from './serve';

const port = process.env.PORT || 3333;

app.listen(port, ()=>{
    console.log(`Servidor ON na port ${port}`)
});