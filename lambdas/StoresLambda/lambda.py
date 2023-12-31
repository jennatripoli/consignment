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
    'Access-Control-Allow-Methods':'SELECT,DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
    'Access-Control-Allow-Origin':'*'
}

columns = ['storeName','balance','inventory','lat','long']

def lambda_handler(event, context):
    # Retrieve database connection parameters from environment variables
    method = event['httpMethod']

    if method == 'GET':
        return get(event,context)
    elif method == 'POST':
        return post(event,context)
    elif method == 'DELETE':
        return delete(event,context)
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
        cursor.execute("SELECT storename, balance, inventory, lat, long FROM store")

        # Fetch and process the query results as needed
        result = cursor.fetchall()

        result = [dict(zip(columns,store)) for store in result]

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
    body = json.loads(event['body'])
    cursor = conn.cursor()
    try:
        if(body['type'] == 'createStore'):
            # Create a cursor object
            statement = "INSERT INTO store values(%s,%s,%s,%s,%s,%s,%s)"
            # Execute your SQL queries here
            cursor.execute(statement,(body['storeName'],body['username'],body['password'],0,0,body['longitude'],body['latitude']))

            conn.commit()
        elif(body['type'] == 'login'):
            statement = "SELECT username, pw FROM store WHERE storename=%s"
            cursor.execute(statement,(body['storeName'],))
            [username,pw] = cursor.fetchall()[0]
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

def delete(event,context):
    conn = psycopg2.connect(**db_params)
    try:
        # Create a cursor object
        cursor = conn.cursor()


        delete_computers = "DELETE FROM computer WHERE store=%s"
        statement = "DELETE FROM store WHERE storename=%s"
        body = json.loads(event['body'])
        # Execute your SQL queries here
        cursor.execute(delete_computers,(body['storeName'],))
        cursor.execute(statement,(body['storeName'],))
        conn.commit()

    except Exception as e:
        return {
        'statusCode': 400,
        'headers': headers,
        'body': json.dumps({
            'message':'unable to delete store',
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
            'message':'succesfully deleted store'
        })
    }