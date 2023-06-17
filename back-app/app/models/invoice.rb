class Invoice < ApplicationRecord
    validates :invoice_number, presence: true, uniqueness: true
    validates :invoice_amount, presence: true
    validates :invoice_due_date, presence: true
  
    has_one_attached :invoice_scan
  
    enum status: { created: 0, rejected: 1, approved: 2, purchased: 3, closed: 4 }
  
    # Other asso
end