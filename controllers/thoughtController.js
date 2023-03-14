const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .populate({
            path: 'reactions',
            select: "-__v",
        })
        .select("-__v")
        .then((thoughts) => res.json(thoughts))
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Get a thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .populate({
            path: 'reactions',
            select: "-__v",
        })
        .select('-__v')
        .then((thought) => {
            if (!thought) {
                res.status(404).json({
                    message: 'No thought with that ID'
                });
            } else {
                res.json(thought);
            };
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            // connect thought with user
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$push: {thoughts: _id}},
                    {new: true},
                );
            })
            .then((thought) => res.json(thought))
            .catch((error) => {
                console.log(error);
                return res.status(500).json(error);
            });
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({
                    message: 'No thought with that ID'
                });
            } else {
                res.json(thought);
            };
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({
                        message: 'No thought with that ID'
                    });
                } else {
                    User.findOneAndUpdate(
                        {thoughts: req.params.thoughtId},
                        {$pull: {thoughts: req.params.thoughtId}},
                        {new: true},
                    );
                };
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({
                        message: 'Thought deleted, but no user found'
                    });
                } else {
                    res.json({
                        message: 'Thought successfully deleted'
                    });
                };
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    },
    // Create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({
                    message: 'No thought with that ID'
                });
            } else {
                res.json(thought);
            };
        })
        .catch((error) => res.status(500).json(error));
    },
    // Delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({
                    message: 'No thought with that ID'
                });
            } else {
                res.json(thought);
            };
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
};
