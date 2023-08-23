class Api::V1::PostsController < ApplicationController
  # GET /api/v1/posts
  def index
    @posts = Post.all
    render json: @posts
  end

  # GET /api/v1/posts/1
  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  # POST /api/v1/posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created # 201
    else
      render json: @post.errors, status: :unprocessable_entity # 422
    end
  end

  # PATCH/PUT /api/v1/posts/1
  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity # 422
    end
  end

  # DELETE /api/v1/posts/1
  def destroy
    @post = Post.find(params[:id])
    @post.destroy
  end

  private
    def post_params
      params.require(:post).permit(:title, :content)
    end
end
