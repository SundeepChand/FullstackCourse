import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('tests for Blog Form component', () => {
  test('when the form is changed & submitted the event-handlers are called with correct parameters', () => {

    const handleSubmit = jest.fn()

    const component = render(
      <BlogForm handleSubmit={handleSubmit} />
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const likesInput = component.container.querySelector('#likes')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'New Blog' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Admin' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'www.google.com' }
    })
    fireEvent.change(likesInput, {
      target: { value: '20' }
    })
    fireEvent.submit(form)

    expect(handleSubmit.mock.calls).toHaveLength(1)
    expect(handleSubmit.mock.calls[0][0].title).toBe('New Blog')
    expect(handleSubmit.mock.calls[0][0].author).toBe('Admin')
    expect(handleSubmit.mock.calls[0][0].url).toBe('www.google.com')
    expect(handleSubmit.mock.calls[0][0].likes).toBe('20')
  })
})
