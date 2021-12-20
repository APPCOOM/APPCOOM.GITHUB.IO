module.exports={
    // "plugins":{
    //     "autoprefixer":{
    //         browsers:'last 5 version'
    //     },
    //     'postcss-pxtorem':{
    //         rootValue:37.5,//75表示750设计稿，37.5表示375设计稿
    //         propList:['*']
    //     }
    // }
    "postcss-pxtorem": {
        "rootValue": 37.5,
        "propList": ['*','!font','!font-size']
     }
}