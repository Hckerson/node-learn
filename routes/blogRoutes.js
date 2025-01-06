import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import {Blog} from '../models/blogs.js'

router.get('/blogs', async(req, res)=>{
    try {
        const blog = await Blog.find().sort({createdAt : -1});
        res.render('index', {title : 'All Blogs', blogs : blog})
    } catch (error) {
        console.log(error)
    }
})

router.post('/blogs', async(req, res)=>{
    try {
        const response =  new Blog(req.body)
        await response.save()
        res.redirect('/blogs')
    } catch (error) {   
        console.log(error)
    }
})

router.get('/blogs/create', (req, res)=>{
    res.render('create', {title : 'Create blog'})
})  


router.get('/blogs/:id', async(req, res)=>{
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('Invalid ID');
  }
  try {
    const blog = await Blog.findById(id);
    res.render('details', {title : 'Blog Details', blog  });
  } catch (error) {
    console.log(error);
  }
});

router.delete('/blogs/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        await Blog.findByIdAndDelete(id);
        res.send({redirect : '/blogs'})
    } catch (error) {
        console.log(error)
    }
})


export default router