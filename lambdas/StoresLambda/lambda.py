import os
import psycopg2
import json

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
        return get(event,context)
    elif method == 'POST':
        return post(event,context)
    else:
        return {
        'isBase64Encoded': True,
        'statusCode': 404,
        'headers':{"Content-Type": "application/json"},
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
        'isBase64Encoded': True,
        'statusCode': 500,
        'headers':{"Content-Type": "application/json"},
        'body': 'something went wrong'
    }
    finally:
        # Close the cursor and database connection
        cursor.close()
        conn.close()

    return {
        'isBase64Encoded': True,
        'statusCode': 200,
        'headers':{"Content-Type": "application/json"},
        'body': json.dumps(result)
    }

def post(event,context):
    conn = psycopg2.connect(**db_params)
    try:
        # Create a cursor object
        cursor = conn.cursor()
        statement = "INSERT INTO store values(%s,%s,%s,%s,%s,%s,%s)"
        body = event['body']
        # Execute your SQL queries here
        cursor.execute(statement,(body['storeName'],body['username'],body['password'],0,0,body['longitude'],body['latitude']))

        conn.commit()

    except Exception as e:
        return {
        'statusCode': 400,
        'headers':{"Content-Type": "application/json"},
        'body': json.dumps({
            'message':'unable to create store',
            'error': e
        })
    }
    finally:
        # Close the cursor and database connection
        cursor.close()
        conn.close()

    return {
        'statusCode': 200,
        'headers':{"Content-Type": "application/json"},
        'body': json.dumps({
            'message':'succesfully created store'
        })
    }