const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const file = path.join(__dirname, '../data', 'arbustum_raw.json');
const target = path.join(__dirname, '../data', 'arbustum_clean.json');


const read = async () => {
    try {
        const data = await readFile(file, 'utf8');
        const trees = JSON.parse(data);
        const buffer = new ArrayBuffer
        let formatTreesList = []

        let avgHeiht = avgSize(trees, 'hauteur_totale');
        let avgDiameter = avgSize(trees, 'diametre_cime')

        trees.forEach(tree => {
            if (tree.hauteur_totale == null) {
                tree.hauteur_totale = Math.round(avgHeiht * 100) / 100;
            }
            if (tree.diametre_cime == null) {
                tree.diametre_cime = Math.round(avgDiameter);
            }
            if (tree.nom_complet == 'en cours de détermination' || tree.nom_complet == 'A DETERMINER') {
                tree.nom_complet = null;
            }

            formatTree = {
                treeName: '',
                treeSpecies: tree.nom_complet,
                wikilink: '',
                location: tree.geoloc,
                value: Math.round(parseFloat(tree.hauteur_totale) * parseFloat(tree.diametre_cime)),
                diameter: parseFloat(tree.diametre_cime),
                height: parseFloat(tree.hauteur_totale),
                locked: false,
                currentOwner: '',
                pastOwners: [],
                comments: []
            }
            formatTreesList.push(formatTree);
        })
        const result = await JSON.stringify(formatTreesList, null, 2);
        return result;
    } catch (err) {
        console.log('Error parsing JSON string : ', err);
    }
}

//average of trees height/width
const avgSize = (trees, mode) => {
    let size = [];
    trees.forEach(tree => {
        if (tree[mode] == null) {
            return;
        }
        size.push(parseFloat(tree[mode]));
    });
    return size.reduce((a, b) => (a + b)) / size.length;
}

read().then((value) => {
    writeFile(target, value);
});