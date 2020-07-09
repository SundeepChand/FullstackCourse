Cypress.Commands.add('login', function({ username, password }) {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createNew', function({ title, author, url, likes}) {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})
