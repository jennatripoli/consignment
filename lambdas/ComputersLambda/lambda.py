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

columns = ['id','price','memory','storage','processor','processorgen','graphics','lat','long','store']

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
        params = event['queryStringParameters']

        if params != None:
            cursor.execute("SELECT * FROM computer where store=%s",(params['storeName'],))
        else:
            cursor.execute("SELECT * FROM computer")

        # Fetch and process the query results as needed
        result = cursor.fetchall()

        result = [dict(zip(columns,store)) for store in result]

    except Exception as e:
        return {
        'statusCode': 400,
        'headers': headers,
        'body': str(e)
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


        statement = "INSERT INTO computer values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        body = json.loads(event['body'])
        # Execute your SQL queries here
        [lat,lon] = cursor.execute("SELECT lat,long from store where store=%s",(body['store'],))
        cursor.execute(statement,(uuid.uuid4().int,body['price'],body['memory'],body['storage'],body['processor'],body['processorGen'],body['graphics'],lat,lon,body['store']))

        conn.commit()

    except Exception as e:
        return {
        'statusCode': 400,
        'headers': headers,
        'body': json.dumps({
            'message':'unable to create computer',
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
            'message':'succesfully created computer'
        })
    }

if __name__ == '__main__':
    print(lambda_handler({'httpMethod':'GET','queryStringParameters':{}},''))