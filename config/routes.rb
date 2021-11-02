Rails.application.routes.draw do
  post '/auth/login', to: 'authentications#login'
  get '/auth/verify', to: 'authentications#verify'

  resources :sales
  resources :products do
    resources :sales
  end
  resources :users do
    resources :products
    resources :sales
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
