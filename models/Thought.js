const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Schema to create Reaction model
const reactionSchema = new Schema(
  {
    //setting custom ID
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format('LLLL'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format('LLLL'),
    },
    // User that created this thought
    username: {
      type: String,
      required: true,
    },
    // Passing in reactionSchema as a nested document array
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Creating a virtual property `reactionCount` that retrieves the length of the user's thought reactions
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;