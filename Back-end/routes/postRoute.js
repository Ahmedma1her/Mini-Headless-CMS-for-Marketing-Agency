const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { protect, authorize } = require("../middleware/authmiddleware.js");
const {validate} = require("../middleware/validation");


const { createPost, deletePost,getAllPost, updatePost} = require("../controllers/postController");
=======

const upload = require("../middleware/upload");
const {
  createPost,
  deletePost,
  getAllPost,
  updatePost,
} = require("../controllers/postController");

const { protect, authorize } = require("../middleware/authMiddleware");
>>>>>>> 2b7b510 (feat: integrate multer middleware for file uploads)

router.get("/all", getAllPost);

// CREATE POST (with image upload)
router.post(
  "/",
  protect,
  upload.single("image"),
  createPost
);

// DELETE POST
router.delete(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  deletePost
);

// UPDATE POST (with optional image)
router.put(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  upload.single("image"),
  updatePost
);

module.exports = router;