import React, { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [likes, setLikes] = useState('')

  return (
    <div>
      <form onSubmit={async(event) => {
        event.preventDefault()
        await handleSubmit({ title, author, url, likes })

        setTitle('')
        setAuthor('')
        setURL('')
        setLikes('')
      }}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={ ({ target }) => { setTitle(target.value) } }
            required
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={ ({ target }) => { setAuthor(target.value) } }
            required
          />
        </div>
        <div>
          URL:
          <input
            id="url"
            type="text"
            name="URL"
            value={url}
            onChange={ ({ target }) => { setURL(target.value) } }
            required
          />
        </div>
        <div>
          Likes:
          <input
            id="likes"
            type="number"
            name="likes"
            value={likes}
            onChange={ ({ target }) => { setLikes(target.value) } }
          />
        </div>

        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
