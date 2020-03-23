const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (total, current) => total + current.likes

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let favouriteBlog = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favouriteBlog.likes)
      favouriteBlog = blog
  })
  return favouriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
