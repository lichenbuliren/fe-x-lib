import { Post } from '../models/Post';
import { Model } from '../core/Model';
import { Comment } from '../models/Comment';

const posts = [
  new Post({ id: 1, title: 'A post', content: 'post0' }),
  new Post({ id: 2, title: 'Other post', content: 'post1' }),
  new Post({ id: 3, title: 'A draft', content: 'post2' }),
];

const comments = [new Comment('First comment'), new Comment('Second comment'), new Comment('Third comment')];

// Post.all.where({ title: 'First post' });
// [Post { id: 1, title: 'First post', content: '...' }]

// Post.all.where({ title: (title: string) => title.startsWith('A') });
// [
//  Post { id: 1, title: 'A post', content: '...' },
//  Post { id: 3, title: 'A draft', content: '...' }
// ]

// Post.all.where({ id: [2, 3] });
// [
//  Post { id: 1, title: 'A post', content: '...' },
//  Post { id: 2, title: 'Other post', content: '...' }
// ]

// Post.all.where({ id: (id: number) => id % 2 === 1, title: 'A post' });
// [Post { id: 1, title: 'A post', content: '...' }]

describe('object-manage', () => {
  it('model instance', () => {
    console.log(Model.instances);
    expect(Model.instances.Post?.length).toBe(3);
    expect(Model.instances.Comment?.length).toBe(3);
  });

  it('Post all', () => {
    expect(Post.all<Post>()).toEqual(posts);
  });

  it(`Post where (title: string) => title.startsWith('A')`, () => {
    const draftPosts = Post.all().where({
      title: (title) => title.startsWith('A'),
    });
    expect(draftPosts).toEqual([posts[0], posts[2]]);
  });

  it('Post where id % 2 === 1', () => {
    const draftPosts = Post.all().where({ id: (id) => id % 2 === 1 });
    expect(draftPosts).toEqual([posts[0], posts[2]]);
  });

  it('Post RecordSet pluck content', () => {
    const draftPosts = Post.all().pluck('content');
    expect(draftPosts).toEqual(posts.map((post) => post.content));
  });

  it('Post RecordSet selected', () => {
    const draftPosts = Post.all().select(['id', 'title'] as const);
    expect(draftPosts).toEqual(posts.map((item) => ({ id: item.id, title: item.title })));
  });

  it('Comment all', () => {
    expect(Comment.all()).toEqual(comments);
  });

  it('Comment where', () => {
    const draftComments = Comment.all<Comment>().where({
      msg: 'First comment',
    });
    expect(draftComments).toEqual([comments[0]]);
  });
});
