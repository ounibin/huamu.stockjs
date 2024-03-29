const dayjs = require('dayjs')
const jsonfile = require('jsonfile')
const path = require('path')
const { getter, api } = require('../src/index')

function getData() {
  const TODAY = dayjs().format('YYYY-MM-DD')
  api.getTodayAll().then((res) => {
    jsonfile
      .writeFile(path.join(__dirname, `data/${TODAY}.json`), res)
      .then(res => console.log('Write complete'))
      .catch(err => console.error(err))
  })
}

async function analysisData() {
  try {
    const TODAY = dayjs().format('YYYY-MM-DD')
    // const TODAY = '2021-09-09'
    console.log('TODAY=', TODAY)
    const data = require(`./data/${TODAY}.json`)
    // 分析完成的结果
    let list = getter.withRedT(data)
    console.log('list===', list)
    list = await getter.withDadan(list)
    list = await getter.withMacd(list)
    // 打印
    if (list.length > 0) {
      console.log('结果：')
      list.forEach((item) => {
        console.log(item.name, item.code)
      })
    }
  } catch (err) {
    console.log('分析出错err=', err)
  }
}

function main() {
  getData()
  // analysisData()
}
main()
