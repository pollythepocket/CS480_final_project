import os
import time
from flask import Flask, render_template, request, redirect, url_for, flash
from database import get_book_list, insert_book, delete_book, update_book, search_books, get_book
from dotenv import load_dotenv
from flask_caching import Cache

# Load environment variable
load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")
app.config["CACHE_TYPE"] = os.getenv("CACHE_TYPE")
app.config["CACHE_REDIS_HOST"] = os.getenv("CACHE_REDIS_HOST")
app.config["CACHE_REDIS_PORT"] = int(os.getenv("CACHE_REDIS_PORT"))
app.config["CACHE_DEFAULT_TIMEOUT"] = int(os.getenv("CACHE_DEFAULT_TIMEOUT"))
app.config["CACHE_REDIS_DB"] = int(os.getenv("CACHE_REDIS_DB"))
cache = Cache(app)


@app.route("/")
def home_view():
    return render_template('home.html')


@app.route("/list", methods=['GET', 'POST'])
def book_list_view():
    if request.method == 'POST':
        search_term = request.form.get('search')
        if search_term:
            # Redirect to the GET request with search term and page 1 (for new search)
            return redirect(url_for('book_list_view', search=search_term, page=1))

    # Get current page and search term from query parameters
    page = request.args.get('page', 1, type=int)
    search_term = request.args.get('search')
    per_page = 100
    time_start = time.time()

    if search_term:
        books = search_books(search_term)
    else:
        # Check if the response is already cached
        books = cache.get('books')
        if books:
            time_end = time.time()
            message = (f"Data loaded from <b>Redis cache</b>. Length: {len(books)}. "
                       f"Time took: <b>{(time_end - time_start):.4f}</b> seconds.")
        else:
            books = get_book_list()
            cache.set("books", books)
            time_end = time.time()
            message = (f"Data loaded from <b>MySQL</b>. Length: {len(books)}. "
                       f"Time took: <b>{(time_end - time_start):.4f}</b> seconds.")
        flash(message, "success")
    total_rows = len(books)
    range_start = (page - 1) * per_page
    range_end = min(page * per_page, total_rows)
    paginated_books = books[range_start: range_end]
    total_pages = (total_rows + per_page - 1) // per_page
    return render_template('list.html',
                           total_rows=total_rows,
                           books=paginated_books, page=page, total_pages=total_pages,
                           range_start=range_start, range_end=range_end, search=search_term)


@app.route("/add", methods=['GET', 'POST'])
def insert_book_view():
    # Handle the update form submission
    if request.method == 'POST':
        book_id = request.form['book_id']
        title = request.form['title']
        category = request.form['category']
        authors = request.form['authors']
        publisher = request.form['publisher']
        edition = request.form['edition']
        available_from = request.form['available_from']

        if get_book(book_id):
            flash(f'Book with ID {book_id} already exists.', 'danger')
        else:
            if insert_book(book_id, title, category, authors, publisher, edition, available_from):
                flash(f'Book ({book_id}) is added successfully!', 'success')
                cache.delete('books')
            else:
                flash('Failed to add book.', 'danger')
    return render_template('add.html')


@app.route("/delete/<book_id>", methods=['POST'])
def delete_book_view(book_id):
    cache.delete('books')
    if delete_book(book_id):
        flash(f'Book ({book_id}) is deleted successfully!', 'success')
    else:
        flash('Failed to delete book.', 'danger')
    return redirect(url_for('book_list_view'))


@app.route("/update/<book_id>", methods=['GET', 'POST'])
def update_book_view(book_id):
    # Handle the update form submission
    if request.method == 'POST':
        cache.delete('books')
        title = request.form['title']
        category = request.form['category']
        authors = request.form['authors']
        publisher = request.form['publisher']
        edition = request.form['edition']
        available_from = request.form['available_from']

        if update_book(book_id, title, category, authors, publisher, edition, available_from):
            flash(f'Book ({book_id}) is updated successfully!', 'success')
        else:
            flash('Failed to update book.', 'danger')

    # If the request method is GET, fetch the existing book details
    book = get_book(book_id)
    return render_template('update.html', book=book)
