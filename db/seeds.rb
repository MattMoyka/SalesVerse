Sale.destroy_all
Product.destroy_all
User.destroy_all

@admin = User.create!(username: 'admin', email: 'admin@email.com', password: '123456')

puts "#{User.count} users created"

15.times do
  Product.create!(name: Faker::Coffee.blend_name, cost: Faker::Number.number(digits: 2),
                  profit: Faker::Number.number(digits: 2), description: Faker::Coffee.notes, img: Faker::LoremFlickr.image(size: '50x60', search_terms: ['coffee']), user: @admin)
end

puts "#{Product.count} products created"
puts Product.name

Product.all.each do |product|
  Sale.create!(buyer: Faker::Name.name, sold_date: '11/01/2021', product: product, user: @admin)
end

puts "#{Sale.count} sales created"
