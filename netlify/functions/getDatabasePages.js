const { Client } = require('@notionhq/client')

exports.handler = async (event) => {
  const databaseId = event.queryStringParameters.databaseId

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const myPage = await notion.databases.query({
    database_id: databaseId,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  }
}
