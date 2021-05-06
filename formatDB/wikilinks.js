const axios = require('axios')

const wikiLink = async (tree) => {
    try {
        if (tree == null) {
            return tree
        }
        const toUtf8 = Buffer.from(tree).toString("UTF-8")
        const data = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: "opensearch",
                search: toUtf8,
                limit: "1",
                format: "json"
            }
        })
        console.log(data)

    } catch (err) {
        console.log(err)
    }
}

wikiLink("populus x canadensis")