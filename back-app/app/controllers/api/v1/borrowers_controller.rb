class Api::V1::BorrowersController < ApplicationController
  before_action :set_borrower, only: %i[ show update destroy ]

  # GET /borrowers
  def index
    @borrowers = Borrower.all

    render json: @borrowers
  end

  # GET /borrowers/1
  def show
    render json: @borrower
  end

  # POST /borrowers
  def create
    @borrower = Borrower.new(borrower_params)

    if @borrower.save
      render json: @borrower, status: :created, location: @borrower
    else
      render json: @borrower.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /borrowers/1
  def update
    if @borrower.update(borrower_params)
      render json: @borrower
    else
      render json: @borrower.errors, status: :unprocessable_entity
    end
  end

  # DELETE /borrowers/1
  def destroy
    @borrower.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_borrower
      @borrower = Borrower.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def borrower_params
      params.require(:borrower).permit(:name)
    end
end
