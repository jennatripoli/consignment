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

headers = {
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods':'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
    'Access-Control-Allow-Origin':'*'
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
        'statusCode': 404,
        'headers': headers,
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
        'headers': headers,
        'body': 'something went wrong'
    }
    finally:
        # Close the cursor and database connection
        cursor.close()
        conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(result)
    }

def post(event,context):
    conn = psycopg2.connect(**db_params)
    try:
        # Create a cursor object
        cursor = conn.cursor()
        statement = "INSERT INTO store values(%s,%s,%s,%s,%s,%s,%s)"
        body = json.loads(event['body'])
        # Execute your SQL queries here
        cursor.execute(statement,(body['storeName'],body['username'],body['password'],0,0,body['longitude'],body['latitude']))

        conn.commit()

    except Exception as e:
        return {
        'statusCode': 400,
        'headers': headers,
        'body': json.dumps({
            'message':'unable to create store',
            'error': str(e)
        })
    }
    finally:
        # Close the cursor and database connection
        cursor.close()
        conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({
            'message':'succesfully created store'
        })
    }