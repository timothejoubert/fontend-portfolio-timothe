const { Client } = require('@notionhq/client')

exports.handler = async (event) => {
  const pageId = event.queryStringParameters.pageId

  console.log(event, pageId, event.queryStringParameters.pageId)

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const pageBlockChildren = await notion.blocks.children.list({
    block_id: pageId,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(pageBlockChildren),
  }
}
