const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async ( context ) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, args, context, info) => {
      const user = await User.create( args );
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          {new: true},
        )
        .populate("book");

        return user;
      }
      throw AuthenticationError;
    },

    removeBook: async ({ bookId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId} } }
        );

        return user;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
