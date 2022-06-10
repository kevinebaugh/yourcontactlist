Rails.application.routes.draw do
  post "/signup", to: "people#create"
  # post "/login", to: "sessions#create"
  get "/me", to: "people#show"

  post "/update_follows", to: "follows#update"

  get "/households", to: "households#index"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
