const { User, Thought } = require('../models');

module.exports = {
   async getThoughts(req, res) {
      try {
         const thoughts = await Thought.find();
         res.json(thoughts);
      } catch (err) {
         console.error(err);
         res.status(500).json({ message: "Failed to retrieve thoughts" });
      }
   },

   async getSingleThought(req, res) {
      try {
         const thought = await Thought.findOne({ _id: req.params.id }).select("-__v");
         if (!thought) {
            return res.status(404).json({ message: "No thought with that id" });
         }
         res.json(thought);
      } catch (err) {
         console.error(err);
         res.status(500).json({ message: "Failed to retrieve thought" });
      }
   },

   async createThought(req, res) {
      try {
         console.log('hitttt')
         const thought = await Thought.create(req.body.thought);
         const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
         );
         if(!user){
            res.status(404).json({message: "Thought was created but user was not found"});
         }
         res.status(200).json(thought);
      } catch (err) {
         console.error(err);
         res.status(500).json({ message: "Failed to create thought" });
      }
   },

   async updateThought(req, res) {
      try {
         const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
         );
         if (!thought) {
            return res.status(404).json({ message: "No thought with that id" });
         }
         res.json(thought);
      } catch (err) {
         console.error(err);
         res.status(500).json({ message: "Failed to update thought" });
      }
   },

   async deleteThought(req, res) {
      try {
         const thought = await Thought.findOneAndRemove({ _id: req.params.id });
         if (!thought) {
            return res.status(404).json({ message: "No thought with that id" });
         }
         await User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
         );
         res.status(200).json({ message: "Thought deleted" });
      } catch (err) {
         console.error(err);
         res.status(500).json({ message: "Failed to delete thought" });
      }
   },

   async createReaction(req, res) {
      try {
         const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
         );
         if (!thought) {
            return res.status(404).json({ message: "No thought with that id" });
         }
         return res.json(thought);
      } catch (err) {
         console.log(err);
         return res.status(500).json({ message: "Internal Server Error" });
      }
   },

   async deleteReaction (req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { reactions: { _id: req.params.reactionId }}},
          { runValidators: true, new: true }
        );
    
        if (!thought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
    
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    }
};


