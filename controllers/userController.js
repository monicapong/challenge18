const { Thought, User } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
        .populate({
            path: 'friends',
            select: "-__v",
        })
        .populate({
            path: 'thoughts',
            select: '-__v',
        })
        .select("-__v")
        .then((users) => res.json(users))
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Get a user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({
                        message: 'No user with that ID'
                    });
                } else {
                    res.json(user);
                };
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((error) => {
                console.log(error);
                return res.status(500).json(error);
            });
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((user) => {
                if (!user) {
                    res.status(404).json({
                        message: 'No user with that ID'
                    });
                } else {
                    Thought.deleteMany({_id: {$in: user.thoughts}});
                };
            })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({
                        message: 'User deleted successfully, but no thoughts found'
                    });
                } else {
                    res.json({
                        message: 'User successfully deleted'
                    });
                };
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    },
    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidatiors: true, new: true},
        )
        .then((user) => {
            if (!user) {
                res.status(400).json({
                    message: 'No user with that ID'
                });
            } else {
                res.json(user);
            };
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidatiors: true, new: true},
        )
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: 'No user with that ID'
                });
            } else {
                res.json(user);
            };
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
};
