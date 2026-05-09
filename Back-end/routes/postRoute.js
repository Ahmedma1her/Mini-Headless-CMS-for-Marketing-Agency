const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {validate, createpostSchema} = require("../middleware/validation");


const { createPost, deletePost,getAllPost, updatePost} = require("../controllers/postController");

router.get("/all", getAllPost);
router.post('/',protect,createPost);
router.delete('/:id', protect, authorize('admin','organizer'), deletePost);
router.put('/:id', protect, authorize('admin','organizer'), updatePost);
module.exports = router