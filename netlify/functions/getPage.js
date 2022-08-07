const { Client } = require('@notionhq/client')

exports.handler = async (event) => {
  const pageId = event.queryStringParameters.pageId

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const response = await notion.pages.retrieve({ page_id: pageId })

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
