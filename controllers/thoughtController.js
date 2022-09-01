const { Thought, User } = require('../models');

module.exports = {
  //Get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },

  //Get a single thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'No thought found with that ID' })
      : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
},

  //Create a new thought
  createThought(req,res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'No thought found with that ID',
            })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Update a thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete a thought by ID
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought found with this ID' })
        : User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: req.params.thoughtId } },
            { runValidators: true, new: true }
          )
    )
    .then((user) =>
      !user
        ? res.status(404).json({
            message: 'Thought deleted, but no user with that ID',
          })
        : res.json({ message: 'Thought successfully deleted!' })
    )
    .catch((err) => res.status(500).json(err));
  },
  
  //Add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .populate('reactions')
    .then((reaction) =>
    !reaction
      ? res.status(404).json({ message: 'No thought found with that ID' })
      : res.json(reaction)
  )
  .catch((err) => res.status(500).json(err));
  },
  
  //Remove reaction
  removeReaction(req, res) {
  thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { _id: req.body.reactionId } } },
    { runValidators: true, new: true }
    )
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'No thought found with that ID' })
      : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
  },
  
};