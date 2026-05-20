const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const { protect, authorize } = require('../middleware/authmiddleware');
const upload = require('../middleware/upload');
const { createPost, deletePost, getAllPost, updatePost } = require('../controllers/postController');

const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Image is too large. Maximum allowed size is 10 MB.' });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

router.get('/all', getAllPost);

router.post(
  '/',
  protect,
  authorize('admin', 'organizer'),
  upload.single('image'),
  handleUploadError,
  createPost
);

router.delete(
  '/:id',
  protect,
  authorize('admin', 'organizer'),
  deletePost
);

router.put(
  '/:id',
  protect,
  authorize('admin', 'organizer'),
  upload.single('image'),
  handleUploadError,
  updatePost
);

module.exports = router;