class Borrower < ApplicationRecord
    validates :name, presence: true
  
    has_many :invoices
  
    # Other associations and methods can be added as per the requirements
  end