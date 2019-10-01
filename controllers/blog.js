const blogsRouter = require('express').Router();
const Blog = require('../model/blogs');


blogsRouter.get('/', async (_request, response, next) => {
  try {
    const getAllblogs = await Blog.find({});
    const toJSONblogs = getAllblogs.map((blog) => blog.toJSON());
    response.json(toJSONblogs);
  } catch (error) { next(error); }
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const savedNnote = await blog.save();
    response.json(savedNnote.toJSON());
  } catch (error) { next(error); }
});

module.exports = blogsRouter;
