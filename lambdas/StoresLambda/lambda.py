import os
import psycopg2

db_params = {
        'user': os.environ['DB_USER'],
        'password': os.environ['DB_PASSWORD'],
        'host': os.environ['DB_HOST'],
        'database': os.environ['DB_NAME'],
        'port': 5432  # Default PostgreSQL port
    }

def lambda_handler(event, context):
    # Retrieve database connection parameters from environment variables
    method = event['httpMethod']

    if method == 'GET':
        get(event,context)
    elif method == 'POST':
        post(event,context)
    else:
        return {
        'statusCode': 404,
        'body': 'method not allowed'
    }

    

    # Establish a connection to the PostgreSQL database
    

def get(event,context):
    conn = psycopg2.connect(**db_params)
    result = ''
    try:
        # Create a cursor object
        cursor = conn.cursor()

        # Execute your SQL queries here
        cursor.execute("SELECT * FROM store")

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

def post(event,context):
    conn = psycopg2.connect(**db_params)
    result = ''
    try:
        # Create a cursor object
        cursor = conn.cursor()

        statement = "INSERT INTO store values(%s,%s,%s,%f,%f,%f,%f)"
        body = event['body']
        # Execute your SQL queries here
        cursor.execute(statement,(event['storeName'],event['username'],event['password'],0,event['longitude'],event['latitude']))

        # Fetch and process the query results as needed
        result = cursor.fetchall()

    except Exception as e:
        return {
        'statusCode': 500,
        'body': {
            'message':'unable to create store',
            'error': e
        }
    }
    finally:
        # Close the cursor and database connection
        cursor.close()
        conn.close()

    return {
        'statusCode': 200,
        'body': {
            'message':'succesfully created store',
            'result': result
        }
    }

lambda_handler('','')