## Your Contact List
### [yourcontactlist.herokuapp.com](https://yourcontactlist.herokuapp.com/)

![2022-09-07 21 34 05](https://user-images.githubusercontent.com/3092522/189014073-41fb26bf-7b33-4e57-ad99-dc29bde497ac.gif)


### Introduction:

  - Every holiday season, my wife and I text all of our friends and family to make sure that we have up-to-date addresses
  - We also share our updated address if it changed
  - Imagine the time saved if everyone had an always up-to-date address

Your Contact List is a React front-end, Rails back-end app to try to solve that problem. You can follow other households and always have their up-to-date contact information.

### Running it locally

Your Contact List runs:

- Ruby (2.7.4) on Rails (6.1.3.2)
- PostgreSQL 1.1
- Node 16
- React 17.0.1


1. Make sure those dependencies are all set locally, then clone this repository:
    ```
    git clone https://github.com/kevinebaugh/yourcontactlist.git
    cd yourcontactlist
    bundle install
    npm install --prefix client
    ```

1. Then, run the back-end...
    ```
    rails s
    ```

1. and (in another terminal window) the front-end:
    ```
    npm start --prefix client
    ```

### Deploying to Heroku

1. Log in to Heroku:
    ```
    heroku login
    ```
1. Create a Heroku app:
    ```
    heroku create your-contact-list
    ```
1. Add the Heroku buildpacks for React and Rails:
    ```
    heroku buildpacks:add heroku/nodejs --index 1
    heroku buildpacks:add heroku/ruby --index 2
    ```
1. Add some commits, then push to Heroku:
    ```
    git push heroku main
    ```
1. Check it out with `heroku open`.

#### Wishlist:
 - Address “staleness”
 - “Bump” a household for an address
   - The magic here would be that only one bump would need to happen, then everyone would have the up-to-date address
- _Have an idea? [Create an issue](https://github.com/kevinebaugh/yourcontactlist/issues/new)_
