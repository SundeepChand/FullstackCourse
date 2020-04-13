import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('test for individual blog component', () => {

  const blog = {
    title: 'New blog',
    author: 'Sundeep Chand',
    likes: 0,
    url: 'www.google.com',
    user: {
      username: 'admin',
      name: 'admin'
    }
  }
  const updateLike = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateLike={updateLike} />
    )
  })

  test('each component displays only title & author by default', () => {
    expect(component.getByText(blog.title)).toBeDefined()
    expect(component.getByText(blog.author)).toBeDefined()
    expect(component.container.querySelector('.hiddenContent')).toHaveStyle('display: none')
  })

  test('when the show button is clicked the url & likes are shown', () => {
    expect(component.container.querySelector('.hiddenContent')).toHaveStyle('display: none')

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container.querySelector('.hiddenContent')).not.toHaveStyle('display: none')
  })

  test('when the like button is clicked twice update function is called twice', () => {

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateLike.mock.calls).toHaveLength(2)
  })
})
