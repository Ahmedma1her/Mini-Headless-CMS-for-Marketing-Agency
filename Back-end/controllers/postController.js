const Post = require('../models/Post');
exports.getAllPost =async (req,res)=>{

    try{
        const post=await Post.find();
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.createPost = async (req,res)=>{
    try{
        const{title,description,category}=req.body;
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
       await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Post deleted"});
    }catch (error){
        res.status(500).json({error:error.message});
    }
};
exports.updatePost= async (req,res) => {
    try{
        const {title,description,category,status}=req.body;             
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {title,description,category,status},
            {new:true}
        );
        res.status(200).json({message:"Post updated",post:updatedPost});
    }catch (error){
        res.status(500).json({error:error.message});        
    }
};

