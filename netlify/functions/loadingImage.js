const { Client } = require('@notionhq/client')

exports.handler = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const blockId = '1ebb67c36ee14fab80166d3a126908c7'

  const contentPage = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 40,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(contentPage),
  }
}
