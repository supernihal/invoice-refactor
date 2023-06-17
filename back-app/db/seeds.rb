require 'faker'
10.times do
  Borrower.create(
    name: Faker::Lorem.sentence,
    )
end