const Post = require('../models/Post');
const { postSchema, updatePostSchema } = require('../middleware/validation');


const extractURLFromMarkdown = (text) => {
  if (!text) return text;
  
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  let extractedURL = null;
  
  while ((match = linkRegex.exec(text)) !== null) {
    extractedURL = match[2]; // Get the URL part
    break; 
  }
  
  return extractedURL || text; 
};

// GET all posts
exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE post
exports.createPost = async (req, res) => {
  try {
    const { error, value } = postSchema.validate(req.body, {
      stripUnknown: true,
      abortEarly: true,
    });
    if (error) return res.status(400).json({ message: error.details[0].message });

    let { title, description, category, status } = value;
    
    
    description = extractURLFromMarkdown(description);

    const newPost = new Post({
      title,
      description,
      category,
      status: status || 'draft',
      image: req.file ? req.file.filename : null,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE post
exports.updatePost = async (req, res) => {
  try {
    const { error, value } = updatePostSchema.validate(req.body, {
      stripUnknown: true,
      abortEarly: true,
    });
    if (error) return res.status(400).json({ message: error.details[0].message });

    let updatedData = { ...value };
    
    
    if (updatedData.description) {
      updatedData.description = extractURLFromMarkdown(updatedData.description);
    }
    
    if (req.file) updatedData.image = req.file.filename;

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({ message: 'Post updated', post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};