import random
import os
import argparse
from faker import Faker
from datetime import datetime, timedelta

# Initialize Faker
fake = Faker()

# Categories for the books
categories = ['Database', 'HPC', 'Programming']

# Example publishers
publishers = ['Pearson', 'O\'Reilly Media', 'Springer', 'Addison-Wesley', 'Packt Publishing']

# Example editions
editions = ['1st Edition', '2nd Edition', '3rd Edition', '4th Edition']


# Function to generate random dates between two dates
def random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randrange(delta.days)
    return start_date + timedelta(days=random_days)


def generate_data(row_count):
    # Start date: October 22, 2024 | End date: December 31, 2024
    start_date = datetime(2024, 10, 22)
    end_date = datetime(2024, 12, 31)
    sql_file = 'book_share_db.sql'
    # Check if the file exists and delete it
    if os.path.exists(sql_file):
        os.remove(sql_file)
    with open(sql_file, 'w') as f:
        ddl = '''
        DROP DATABASE IF EXISTS book_share_db;
        CREATE DATABASE book_share_db;
        USE book_share_db;
        CREATE TABLE IF NOT EXISTS books(
            book_id VARCHAR(30) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            category VARCHAR(100),
            authors VARCHAR(255),
            publisher VARCHAR(255),
            edition VARCHAR(50),
            available_from DATE
        );
    '''
        f.write(ddl)
        f.write(f"INSERT INTO books (book_id, title, category, authors, publisher, edition, available_from) VALUES\n")
        for i in range(row_count):
            # Generate random book details
            title = fake.catch_phrase()  # Random realistic title
            category = random.choice(categories)
            authors = fake.name()
            publisher = random.choice(publishers)
            edition = random.choice(editions)
            available_from = random_date(start_date, end_date).strftime('%Y-%m-%d')

            # Generate book_id based on title abbreviation
            book_id = ''.join([word[0] for word in title.split()]).upper() + str(random.randint(1, 99999)) + str(i)

            # Create the SQL INSERT statement

            if i != (row_count - 1):
                sql = f"(\"{book_id}\", \"{title}\", \"{category}\", \"{authors}\", \"{publisher}\", \"{edition}\", \"{available_from}\"),\n"
            else:
                sql = f"(\"{book_id}\", \"{title}\", \"{category}\", \"{authors}\", \"{publisher}\", \"{edition}\", \"{available_from}\")"
            f.write(sql)
        f.write(";")
    print(f"SQL file with {row_count} rows has been generated: {sql_file}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate data with specified number of rows.")
    parser.add_argument('--rows', type=int, default=500000,
                        help='Number of rows to generate (default: 500000)')
    args = parser.parse_args()

    generate_data(row_count=args.rows)
