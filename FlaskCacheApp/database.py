import os
import pymysql
from dotenv import load_dotenv

# Load environment variable
load_dotenv()


def get_connection():
    """Create and return a new database connection."""
    return pymysql.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )


def get_book_list():
    connection = get_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `books`"
            cursor.execute(sql)
            return cursor.fetchall()


def get_book(book_id):
    connection = get_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `books` WHERE `book_id`=%s"
            cursor.execute(sql, (book_id,))
            return cursor.fetchone()


def insert_book(book_id, title, category, authors, publisher, edition, available_from):
    connection = get_connection()
    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = '''
            INSERT INTO `books` (`book_id`, `title`, `category`, `authors`, `publisher`, `edition`, `available_from`) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            '''
            cursor.execute(sql, (book_id, title, category, authors, publisher, edition, available_from))
        connection.commit()
        return True
    return False


def update_book(book_id, title, category, authors, publisher, edition, available_from):
    connection = get_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = '''
            UPDATE `books` 
            SET title = %s, category = %s, authors = %s, publisher = %s, edition = %s, available_from = %s 
            WHERE book_id = %s
            '''
            cursor.execute(sql, (title, category, authors, publisher, edition, available_from, book_id))
        connection.commit()
        return True
    return False


def search_books(search_term):
    connection = get_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = '''
            SELECT * FROM `books` 
            WHERE book_id = %s 
            OR title LIKE %s
            OR category LIKE %s
            OR authors LIKE %s
            OR publisher LIKE %s
            OR edition LIKE %s
            '''
            search_pattern = '%' + search_term + '%'
            cursor.execute(sql, (search_term, search_pattern, search_pattern,
                                 search_pattern, search_pattern, search_pattern))
            return cursor.fetchall()


def delete_book(book_id):
    connection = get_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "DELETE FROM `books` WHERE `book_id` = %s"
            cursor.execute(sql, (book_id,))
        connection.commit()
        return cursor.rowcount > 0
