const { Client } = require('@notionhq/client')

exports.handler = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const databaseId = '18d6d0f4830046c2980c5e7850f4e00d'

  const myPage = await notion.databases.query({
    database_id: databaseId,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  }
}
