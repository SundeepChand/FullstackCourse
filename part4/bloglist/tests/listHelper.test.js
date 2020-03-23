const listHelper = require('../utils/list_helper')
const testBlogs = require('./testBlogs')

test('dummy returns one', () => {
  const result = listHelper.dummy(testBlogs.emptyBlogList)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(testBlogs.listWithOneBlog)).toBe(5)
  })

  test('when list has no blogs zero is returned', () => {
    expect(listHelper.totalLikes(testBlogs.emptyBlogList)).toBe(0)
  })

  test('when list has five blogs, total sum of likes is returned', () => {
    expect(listHelper.totalLikes(testBlogs.listWithFiveBlogs)).toBe(22)
  })
})

describe('favourite blog', () => {

  test('when list contains one element only first element is returned', () => {
    expect(listHelper.favouriteBlog(testBlogs.listWithOneBlog)).toEqual(testBlogs.listWithOneBlog[0])
  })

  test('when list contains no element null is returned', () => {
    expect(listHelper.favouriteBlog(testBlogs.emptyBlogList)).toEqual(null)
  })

  test('when list contains repeated blogs, first of the repeated elements is returned', () => {
    expect(listHelper.favouriteBlog(testBlogs.listWithRepeatedBlogs)).toEqual(testBlogs.listWithRepeatedBlogs[0])
  })

  test('when list contains different elements the maximum element is returned', () => {
    expect(listHelper.favouriteBlog(testBlogs.listWithFiveBlogs)).toEqual(testBlogs.listWithFiveBlogs[3])
  })
})
