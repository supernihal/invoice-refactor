class Api::V1::InvoicesController < ApplicationController
  before_action :set_invoice, only: %i[ show update destroy ]

  # GET /invoices
  def index
    @invoices = Invoice.all.includes(:borrower)
    invoices_with_associations = @invoices.map do |record|
      record.attributes.merge(
        'borrower' => record.borrower,
      )
    end
    render json: invoices_with_associations
  end

  # GET /invoices/1
  def show
    render json: @invoice
  end

  # POST /invoices
  def create
    @invoice = Invoice.new(invoice_params)

    if @invoice.save
      render json: @invoice, status: :created, location: api_v1_invoice_path(@invoice)
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end


  # PATCH /invoices/1/approve
  def approve
    set_invoice
    @invoice.approve!
  end

  # PATCH /invoices/1/reject
  def reject
    set_invoice
    @invoice.reject!
  end

  # PATCH /invoices/1/purchase
  def purchase
    set_invoice
    @invoice.purchase!
  end

  # PATCH /invoices/1/close
  def close
    set_invoice
    @invoice.close!
  end

  # DELETE /invoices/1
  def destroy
    set_invoice
    @invoice.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_invoice
      p "set invoice called"
      @invoice = Invoice.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def invoice_params
      params.require(:invoice).permit(:invoice_number, :invoice_amount, :invoice_due_date, :scan, :invoice_amount, :borrower_id)
    end
end
