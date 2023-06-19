require 'aasm'
class Invoice < ApplicationRecord
    include AASM
    validates :invoice_number, presence: true, uniqueness: true
    validates :invoice_amount, presence: true
    validates :invoice_due_date, presence: true
  
    has_one_attached :invoice_scan
    belongs_to :borrower
  
    aasm do
        state :created, initial: true
        state :approved
        state :rejected
        state :purchased
        state :closed

        event :approve do
            transitions from: [:created], to: :approved
        end

        event :reject do
            transitions from: [:created], to: :rejected
        end

        event :purchase do
            transitions from: [:approved], to: :purchased
        end

        event :close do
            transitions from: [:purchased], to: :closed
        end
    end
end