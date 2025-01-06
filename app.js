const port = 3000;
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './routes/blogRoutes.js';
const app = express();
const dbURI = 'mongodb+srv://drex:264813795@nodetuts.mhwve.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts'
app.use(express.urlencoded({extended: true}));


async function connectToDatabase(params) {
    try {
        await mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Connected to DB')
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        })
        
    } catch (error) {
        console.log(error)
    }

}

async function startDatabase(params) {
    try {
        await connectToDatabase()
    } catch (error) {
        console.log(error)
    }
}   

startDatabase()

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(morgan('dev'))

app.get('/', (req, res)=>{
    res.redirect('/blogs')
});


app.get('/about', (req, res)=>{
    res.render('about', {title : 'About'})
})

app.use(router)


app.use((req, res)=>{
    res.status(404).render('404', {title : '404 Page'})
})
