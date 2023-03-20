const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Types } = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    },
  },
  {
    id: false
  }
);


module.exports = reactionSchema;
