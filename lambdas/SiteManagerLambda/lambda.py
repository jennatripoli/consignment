import os
import psycopg2
import json
import uuid

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

    if method == 'POST':
        return post(event,context)
    elif method == 'GET':
        return get(event,context)
    else:
        return {
        'statusCode': 404,
        'headers': headers,
        'body': 'method not allowed'
    }

def get(event,context):
    conn = psycopg2.connect(**db_params)
    try:
        # Create a cursor object
        cursor = conn.cursor()

        # Execute your SQL queries here
        cursor.execute("SELECT inventory FROM store")

        inventory = 0.0

        for store in cursor.fetchall():
            inventory += store[0]

        cursor.execute("SELECT sitebalance FROM sitemanager")

        balance = cursor.fetchall()[0][0]

        balance = round(balance,2)
        inventory = round(inventory,2)

        conn.commit()

    except Exception as e:
        return {
        'statusCode': 400,
        'headers': headers,
        'body': json.dumps({
            'message':'unable to get balance and inventory',
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
            'balance':balance,
            'inventory':inventory
        })
    }

def post(event,context):
    conn = psycopg2.connect(**db_params)
    try:
        # Create a cursor object
        cursor = conn.cursor()

        body = json.loads(event['body'])
        # Execute your SQL queries here
        cursor.execute("SELECT * from sitemanager")
        [username,pw,sitebalance,siteinventory] = cursor.fetchall()[0]

        if(body['password'] != pw or body['username'] != username):
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'message':'incorrect username or password'
                })
            }
        conn.commit()

    except Exception as e:
        return {
        'statusCode': 400,
        'headers': headers,
        'body': json.dumps({
            'message':'unable to log in',
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
            'message':'succesfully logged in'
        })
    }