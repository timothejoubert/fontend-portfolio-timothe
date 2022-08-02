const { Client } = require('@notionhq/client')

exports.handler = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const databaseId = 'fd697b929bf8453395b6d335b7ef110b'

  const myPage = await notion.databases.query({
    database_id: databaseId,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  }
}
