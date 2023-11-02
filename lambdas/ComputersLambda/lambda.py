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

columns = ['id','price','memory','storage','processor','processorgen','graphics','lat','long','store','timecreated','name']

def lambda_handler(event, context):
    # Retrieve database connection parameters from environment variables
    method = event['httpMethod']

    if method == 'GET':
        return get(event,context)
    elif method == 'POST':
        return post(event,context)
    elif method == 'DELETE':
        return delete(event, context)
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
        for item in result:
            item['timecreated'] = json.dumps(item['timecreated'], default=str)

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
        body = json.loads(event['body'])
        cursor = conn.cursor()
        if body['request'] == 'insert':
            statement = "INSERT INTO computer values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            update_store = "UPDATE store set inventory=%s where storename=%s"
            
            # Execute your SQL queries here
            cursor.execute("SELECT lat,long,inventory from store where storename=%s",(body['store'],))
            [lat,lon,inventory] = cursor.fetchall()[0]
            cursor.execute(statement,(str(uuid.uuid4()),float(body['price']),body['memory'],body['storage'],body['processor'],body['processorGen'],body['graphics'],lat,lon,body['store'],body['createTime'],body['name']))
            cursor.execute(update_store,(inventory+float(body['price']),body['store']))
            conn.commit()
        elif body['request'] == 'update':
            statement = "UPDATE computer SET price=%s WHERE cid=%s"
            update_store = "UPDATE store SET inventory=%s WHERE storename=%s"
            get_price = "SELECT price FROM computer WHERE cid=%s"
            get_inventory = "SELECT inventory FROM store WHERE storename=%s"

            cursor.execute(get_price,(body['id'],))
            price = cursor.fetchall()[0][0]

            cursor.execute(get_inventory,(body['store'],))
            inventory = cursor.fetchall()[0][0]

            cursor.execute(statement,(float(body['price']),body['id']))
            
            cursor.execute(update_store,(inventory+float(body['price'])-price,body['store']))
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

def delete(event,context):
    conn = psycopg2.connect(**db_params)
    try:
        # Create a cursor object
        cursor = conn.cursor()


        statement = "DELETE FROM computer WHERE cid=%s"
        update_store = "UPDATE store set inventory=%s where storename=%s"
        body = json.loads(event['body'])
        # Execute your SQL queries here
        cursor.execute("SELECT lat,long,inventory from store where storename=%s",(body['store'],))
        [lat,lon,inventory] = cursor.fetchall()[0]
        cursor.execute(statement,(body['id'],))
        cursor.execute(update_store,(inventory-float(body['price']),body['store']))
        conn.commit()

    except Exception as e:
        return {
        'statusCode': 400,
        'headers': headers,
        'body': json.dumps({
            'message':'unable to delete computer',
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
            'message':'succesfully deleted computer'
        })
    }

if __name__ == '__main__':
    print(lambda_handler({'httpMethod':'POST', 'body': "{ \"price\": 100,\"memory\": \"memory\",\"storage\": \"storage\",\"processor\": \"processor\",\"processorGen\": \"processorGen\",\"graphics\": \"graphics\",\"store\": \"test\"}"},''))