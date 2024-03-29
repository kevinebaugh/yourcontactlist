Rails.application.routes.draw do
  post "/signup", to: "people#create"
  post "/signin", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"
  get "/me", to: "people#show"

  post "/update_follows", to: "follows#update"
  post "/remove_follow", to: "follows#remove"

  get "/households", to: "households#index"
  post "households/new", to: "households#new"
  delete "/households", to: "households#delete"
  get "/sorted_households", to: "households#sorted_households"

  put "/update_address", to: "households#update_address"
  delete "/delete_address", to: "households#delete_address"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
