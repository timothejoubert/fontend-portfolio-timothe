const { Client } = require('@notionhq/client')


const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
})

const databaseId = '18d6d0f4830046c2980c5e7850f4e00d'


export const getDatabase = () => {
  return notionClient.databases.query({database_id: databaseId})
}

export const getPageBlock = (blockId: string) => {
  return notionClient.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })
}

export const getPage = (pageId: string) => {
  return notionClient.pages.retrieve({ page_id: pageId });
}

  /*
  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  }
   */

