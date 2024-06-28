import { ConflictError, NotFoundError } from '../utils/error';
import repositories from '../database/repositories';
import { EntityManager, Like, Not } from 'typeorm';
import { User } from '../database/models';
import db from 'database/db';

export async function createUser(email: string, tx?: EntityManager) {
  const exisitingUser = await repositories.user.findOne({ email }, tx);

  if (exisitingUser !== null) {
    throw new ConflictError('User with same email already exists');
  }

  const user = await repositories.user.createUser({ email });
  return user;
}

export async function findUser(
  id?: string,
  email?: string,
  tx?: EntityManager,
) {
  const user = await repositories.user.findOne({ id, email }, tx);
  return user;
}

export async function updateUser(
  id: string,
  updates: Partial<User>,
  tx?: EntityManager,
) {
  await repositories.user.updateUser({ id, updates }, tx);
}

export async function updateUsername(
  id: string,
  username: string,
  tx?: EntityManager,
) {
  if ((await repositories.user.findOne({ username }, tx)) !== null) {
    throw new ConflictError('Username taken');
  }

  await repositories.user.updateUser({ id, updates: { username } }, tx);
}

export async function updateEmail(
  id: string,
  email: string,
  tx?: EntityManager,
) {
  if (findUser(undefined, email) !== null) {
    throw new ConflictError('Email already exists');
  }

  // create new auth flow
}

export async function createThought(
  userId: string,
  content: string,
  tx?: EntityManager,
) {
  const thought = await repositories.thought.createThought(
    { userId, content },
    tx,
  );

  // generate feeds

  createFeedForFollowers(userId, thought.id);

  return thought;
}

export async function deleteThought(
  id: string,
  userId: string,
  tx?: EntityManager,
) {
  await repositories.thought.deleteThought({ user: { id: userId }, id }, tx);
}

export async function getThoughts(
  userId: string,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  const thoughts = await repositories.thought.findMany(
    { user: { id: userId } },
    skip,
    take,
    tx,
  );
  return thoughts;
}

export async function followUser(
  userId: string,
  followId: string,
  tx?: EntityManager,
) {
  if (userId === followId) {
    throw new ConflictError('Cannot follow self');
  }
  const follow = await repositories.user.findOne({ id: followId }, tx);

  if (follow === null) {
    throw new NotFoundError('User to be followed not found');
  }

  await repositories.user.followUser(userId, followId, tx);

  // create feed for followed user
  createFeedFromFollowedUser(userId, followId);
}

export async function getFollowing(
  userId: string,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  return await repositories.user.getFollowing(userId, skip, take, tx);
}

export async function getFollowers(
  userId: string,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  return await repositories.user.getFollowers(userId, skip, take, tx);
}
export async function unfollowUser(
  userId: string,
  followId: string,
  tx?: EntityManager,
) {
  if (userId === followId) {
    throw new ConflictError('Cannot unfollow self');
  }

  const follow = await repositories.user.findOne({ id: followId }, tx);
  if (follow === null) {
    throw new NotFoundError('User to be unfollowed not found');
  }

  await repositories.user.unfollowUser(userId, followId, tx);

  // delete feed from unfollowed user
  deleteFeedFromUnfollowedUser(userId, followId);
}

export async function createFeedForFollowers(
  userId: string,
  thoughtId: string,
) {
  // This would usually be a background job, or kept in a queue for processing by a feed server
  setTimeout(async () => {
    const followers = await repositories.user.getFollowers(userId, 0);

    for (const follower of followers) {
      repositories.feed
        .createFeed({
          userId: follower.follower.id,
          thoughtId,
        })
        .catch(() => {});
    }
  }, 0);
}

export async function createFeedFromFollowedUser(
  userId: string,
  followedUserId: string,
) {
  // This would usually be a background job, or kept in a queue for processing by a feed server
  setTimeout(async () => {
    const thoughts = await repositories.thought.findMany(
      { user: { id: followedUserId } },
      0,
    );

    for (const thought of thoughts) {
      // if you follow and unfollow someone, there might be dupllicate feeds and the db will see that as a conflict so just ignore any errors
      repositories.feed
        .createFeed({ userId, thoughtId: thought.id })
        .catch(() => {});
    }
  }, 0);
}

export async function deleteFeedFromUnfollowedUser(
  userId: string,
  followedUserId: string,
) {
  // This would usually be a background job, or kept in a queue for processing by a feed server
  setTimeout(async () => {
    const thoughts = await repositories.thought.findMany(
      { user: { id: followedUserId } },
      0,
    );

    for (const thought of thoughts) {
      repositories.feed
        .deleteFeed({
          user: { id: userId },
          thought: { id: thought.id },
        })
        .catch(() => {});
    }
  }, 0);
}

export async function getFeeds(
  userId: string,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  return await repositories.feed.findMany(
    { user: { id: userId } },
    skip,
    take,
    tx,
  );
}

export async function deleteFeed(
  userId: string,
  feedId: string,
  tx?: EntityManager,
) {
  const feed = await repositories.feed.findOne({ id: feedId }, tx);

  if (feed === null) {
    throw new NotFoundError('Feed not found');
  }
  await repositories.feed.deleteFeed(
    {
      user: { id: userId },
      id: feedId,
    },
    tx,
  );
}

export async function searchUsers(
  userId: string,
  query: string,
  skip: number,
  take?: number,
  tx?: EntityManager,
) {
  const result = await repositories.user.findMany(
    {
      id: Not(userId),
      email: Like(`%${query}%`),
    },
    skip,
    take,
    tx,
  );

  const isFollowings = await Promise.all(
    result.map((user) => repositories.user.isFollowing(userId, user.id)),
  );

  return result.map((user, i) => ({
    ...user,
    isFollowing: isFollowings[i],
  }));
}
