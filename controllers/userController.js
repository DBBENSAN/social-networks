const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json({message: 'Internal server error'}));
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.id})
            .select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                } else {
                    res.json(user);
                }
            })
            .catch((err) => res.status(500).json({ message: 'Internal server error' }));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.status(200).json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {runValidators: true, new: true}
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                } else {
                    res.status(200).json(user);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                } else {
                    return Thought.deleteMany({ _id: { $in: user.thoughts } });
                }
            })
            .then(() => res.status(200).json({ message: 'User and associated thoughts deleted' }))
            .catch((err) => res.status(500).json({ message: 'Internal server error' }));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: { friends: req.body.friendId }},
            {runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                } else {
                    res.json(user);
                }
            })
            .catch((err) => res.status(500).json({ message: 'Internal server error' }));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.body.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                } else {
                    res.json({ message: 'Friend removed' });
                }
            })
            .catch((err) => res.status(500).json({ message: 'Internal server error' }));
    }
};
