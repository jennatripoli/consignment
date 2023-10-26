import os
import psycopg2

def lambda_handler(event, context):
    # Retrieve database connection parameters from environment variables
    db_params = {
        'user': os.environ['DB_USER'],
        'password': os.environ['DB_PASSWORD'],
        'host': os.environ['DB_HOST'],
        'database': os.environ['DB_NAME'],
        'port': 5432  # Default PostgreSQL port
    }

    # Establish a connection to the PostgreSQL database
    conn = psycopg2.connect(**db_params)
    result = ''
    try:
        # Create a cursor object
        cursor = conn.cursor()

        # Execute your SQL queries here
        cursor.execute("SELECT * FROM customer")

        # Fetch and process the query results as needed
        result = cursor.fetchall()

    except Exception as e:
        return {
        'statusCode': 500,
        'body': 'something went wrong'
    }
    finally:
        # Close the cursor and database connection
        cursor.close()
        conn.close()

    return {
        'statusCode': 200,
        'body': result
    }


lambda_handler('','')