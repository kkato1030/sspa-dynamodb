const tableName = process.env.table_name

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()


exports.main = async (event) => {
  console.info(event)
  let params = { TableName: tableName }
  let body
  if (event.httpMethod == 'GET') {
    const res = await docClient.scan(params).promise()
    console.info(res)
    body = res.Items
  }

  if (event.httpMethod == 'POST') {
    params.Item = JSON.parse(event.body)
    const res = await docClient.put(params).promise()
    console.info(res)
    body = { message: 'ok' }
  }

  console.info(body)

  return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body)
  }
}

