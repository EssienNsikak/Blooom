const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema (
  {
    text: {
      type: String,
      required: true
    },

    userId: {
      type: String,
      required: true
    }, 

    postId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    
  },
  {timestamps: true}
)

module.exports = mongoose.model('Comment', CommentSchema);