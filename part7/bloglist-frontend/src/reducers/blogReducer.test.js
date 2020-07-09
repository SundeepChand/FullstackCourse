import blogReducer, {
  addBlog,
  updateLikes,
  initBlogs,
  deleteBlog
} from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {

  const newBlog1 = {
    id: 1,
    title: 'New test blog',
    author: 'Sundeep',
    url: 'www.google.com',
    likes: '5'
  }

  const newBlog2 = {
    id: 2,
    title: 'New test blog 2',
    author: 'John',
    url: 'www.google.com',
    likes: '6'
  }

  test('state is initialized with a list of new blogs with INIT_BLOGS', () => {
    const state = []

    deepFreeze(state)
    const newState = blogReducer(state, initBlogs([newBlog1, newBlog2]))

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(newBlog1)
    expect(newState).toContainEqual(newBlog2)
  })

  test('adds a new blog to the state with action ADD_BLOG', () => {
    const state = []

    deepFreeze(state)
    const newState = blogReducer(state, addBlog(newBlog1))

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(newBlog1)
  })

  test('likes is updated with the action UPDATE_LIKES', () => {
    const state = [newBlog1, newBlog2]

    deepFreeze(state)
    const newState = blogReducer(state, updateLikes(newBlog2.id))

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual({ ...newBlog2, likes: newBlog2.likes + 1 })
  })

  test('blog is deleted with action DELETE_BLOG', () => {
    const state = [newBlog1, newBlog2]

    deepFreeze(state)
    const newState = blogReducer(state, deleteBlog(newBlog1.id))

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(newBlog2)
    expect(newState).not.toContainEqual(newBlog1)
  })
})
