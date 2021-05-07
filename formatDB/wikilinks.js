const { nameByRace } = require('fantasy-name-generator');
const axios = require('axios')
const fs = require('fs');
const util = require('util');
const path = require('path');
const cliProgress = require('cli-progress');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const file = path.join(__dirname, '../data', 'arbustum_clean.json');
const target = path.join(__dirname, '../data', 'arbustum.json');


const read = async (links) => {
    try {
        const json = await readFile(file, 'utf8');
        const trees = JSON.parse(json);
        const progress2 = new cliProgress.SingleBar({}, cliProgress.Presets.rect);

        let formatTreesList = []

        const race = ['ogre', 'goblin', 'elf', 'darkelf', 'drow', 'gnome'];
        const gender = ['female', 'male'];


        progress2.start(trees.length, 0)


        for (let i = 0; i < trees.length; i++) {
            const name = nameByRace(race[Math.floor(Math.random() * race.length)], { gender: gender[Math.floor(Math.random() * 2)] });
            trees[i].treeName = name;


            for (const n in links) {
                if (trees[i].treeSpecies == links[n].originalName) {
                    trees[i].wikilink = links[n].link;
                }
                if (trees[i].treeSpecies == null) {
                    trees[i].wikilink = 'https://en.wikipedia.org/wiki/Tree';
                }
            }
            formatTreesList.push(trees[i]);
            progress2.update(i + 1);
        }
        const result = await JSON.stringify(formatTreesList, null, 2);
        progress2.stop();
        return result;
    } catch (err) {
        console.log('Error parsing JSON string : ', err);
    }
}


const wikiLink = async (names) => {
    try {
        const linksObject = []
        const progress1 = new cliProgress.SingleBar({}, cliProgress.Presets.rect);

        progress1.start(names.length, 0)
        for (let i = 0; i < names.length; i++) {
            let tree = names[i];
            let original = tree;
            tree = tree.split(" '");
            tree = tree[0];
            let treeLink = {};

            if (tree == null) {
                return
            }
            const treeUtf8 = Buffer.from(tree).toString("UTF-8")
            let link = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: "opensearch",
                    search: treeUtf8,
                    limit: "1",
                    format: "json"
                }
            })

            if (link.data[3][0] == undefined) {
                tree = tree.split(' ');
                tree = tree[0];
                tree = tree.toString();
                const undefUTF8 = Buffer.from(tree).toString("UTF-8")
                link = await axios.get('https://en.wikipedia.org/w/api.php', {
                    params: {
                        action: "opensearch",
                        search: undefUTF8,
                        limit: "1",
                        format: "json"
                    }
                })
            }
            treeLink.originalName = original;
            treeLink.link = link.data[3][0];
            linksObject.push(treeLink);
            progress1.update(i + 1);
        }
        progress1.stop();
        return linksObject;
    } catch (err) {
        console.log(err)
    }
}


async function getNames() {
    const data = await readFile(file, 'utf8');
    const trees = JSON.parse(data);
    let treeNames = []
    trees.forEach(tree => {
        if (tree.treeSpecies == null) {
            return 'tree';
        }
        treeNames.push(tree.treeSpecies);
    })
    let singleNames = [...new Set(treeNames)]
    return singleNames;
}


getNames().then((names) => {
    wikiLink(names).then((links) => {
        console.log('🔎 Wikipedia requests done !');
        read(links).then((object) => {
            console.log('📚 Wikilinks updated !');
            writeFile(target, object).then(() => {
                console.log('✔️ Arbustum updated !')
            })
        })
    })
})



/* const race = ['ogre', 'goblin', 'elf', 'darkelf', 'drow', 'gnome'];
const gender = ['female', 'male'];


progress2.start(trees.length, 0)
for (let i = 0; i < trees.length; i++)

{
    const name = nameByRace(race[Math.floor(Math.random(race.length)) - 1], { gender: gender[Math.floor(Math.random(2)) - 1] });


    trees[i].treeName = name;


} */