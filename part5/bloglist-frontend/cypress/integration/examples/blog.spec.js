describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // Add a new user
    const user1 = {
      username: 'mluukkai',
      password: 'salainen',
      name: 'Matti Luukkainen'
    }

    const user2 = {
      username: 'admin',
      password: 'admin',
      name: 'Admin'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)

    // Visit the frontend
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[type=text]').type('mluukkai')
      cy.get('input[type=password]').type('salainen')

      cy.contains('Login').click()

      cy.contains('Matti Luukkainen is logged in')
    })

    it('fails with invalid credentials', function() {
      cy.get('input[type=text]').type('mluukkai')
      cy.get('input[type=password]').type('wrong')

      cy.contains('Login').click()

      cy.get('.error')
        .should('contain', 'Invalid credentials! Unable to login')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', function() {
      cy.contains('New Blog').click()

      cy.get('#title').type('A new test blog')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('www.google.com')
      cy.get('#likes').type('30')
      cy.contains('save').click()

      cy.visit('http://localhost:3000')
      cy.contains('A new test blog')
    })

    describe('When some blogs exist', function() {
      beforeEach(function() {
        cy.createNew({ title: 'First blog', author: 'Jane Doe', url: 'www.facebook.com', likes: 300 })
        cy.createNew({ title: 'Second blog', author: 'Jane Doe', url: 'www.facebook.com', likes: 0 })
        cy.createNew({ title: 'Third blog', author: 'Jane Doe', url: 'www.facebook.com', likes: 20 })
      })

      it('User can like a post', function() {
        cy.contains('Second blog').parent().as('blogDiv')
        cy.get('@blogDiv').contains('view').click()
        cy.get('@blogDiv').contains('like').click()
        cy.get('@blogDiv').contains('Likes: 1')
      })

      it('The user who created the blog can only delete it', function() {
        cy.contains('Second blog').parent().as('blogDiv')
        cy.get('@blogDiv').contains('view').click()
        cy.get('@blogDiv').contains('remove').click()

        cy.get('.error').should('contain', 'Successfully removed the blog')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

        cy.visit('http://localhost:3000')
        cy.get('html').should('not.contain', 'Second blog')
      })

      it('The user who did not create the blog can\'t delete it', function() {
        cy.contains('Logout').click()

        cy.login({ username: 'admin', password: 'admin' })

        cy.contains('Admin is logged in.')
        cy.get('html').should('not.contain', 'remove')
      })

      it('The blogs are ordered in descending order', function() {
        let descending = true
        cy.get('.likes')
          .then(likes => {
            for (let i = 1; i < likes.length; i++) {
              if (Number(likes[i].innerHTML) > Number(likes[i - 1].innerHTML)) {
                descending = false
              }
            }
          })

        expect(descending).to.equal(true)
      })
    })
  })
})
