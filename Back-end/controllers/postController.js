const Post = require('../models/Post')
const {postSchema,updatePostSchema}=require('../middleware/validation')
exports.getAllPost =async (req,res)=>{

    try{
        const post=await Post.find()
        if (post.length === 0)return res.status(400).json({msg:"you're invited to create the first post"})
        res.status(200).json(post)
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.createPost = async (req,res)=>{
    try{
        // const{title,description,category}=req.body;
        const {error,value}=postSchema.validate(req.body,{
            stripUnknown:true,
            abortEarly:true
        })
        if (error) return res.status(400).json({msg:"kindly fill all the required fields"})
            const{title,description,category}=value
      const newPost = new Post({
            title,
            description,
            category,
});

        await newPost.save();
        res.status(201).json({message:"Post created successfully",post:newPost});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.deletePost= async (req,res) => {
    try{
       const deletedPost = await Post.findByIdAndDelete(req.params.id);
       if (!deletedPost) return res.status(404).json({msg:"post not found"})
        res.status(200).json({message:"Post deleted"});
    }catch (error){
        res.status(500).json({error:error.message});
    }
};
exports.updatePost= async (req,res) => {
    try{
        const {error,value}=updatePostSchema.validate(req.body,{
            stripUnknown:true,
            abortEarly:true
        })
        if (error) return res.status(400).json({msg:"kindly fill all the required fields"})
        const {title,description,category,status}=value             
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {title,description,category,status},
            {new:true}
        );
        if (!updatedPost) return res.status(404).json({msg:"post not found"})
        res.status(200).json({message:"Post updated",post:updatedPost});
    }catch (error){
        res.status(500).json({error:error.message});        
    }
};

