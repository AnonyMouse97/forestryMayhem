const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const test = path.join(__dirname, '../data', 'arbustum_raw.json')


const read = async () => {
    try {
        const data = await readFile(test, 'utf8');
        const trees = JSON.parse(data);

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
                treeSpecies: tree.nom_complet,
                location: tree.geoloc,
                height: parseFloat(tree.hauteur_totale),
                width: parseFloat(tree.diametre_cime)
            }
            formatTreesList.push(formatTree);
        })
        return formatTreesList;
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
    console.log(value);
});

/*
        fs.readFile('./data/arbustum.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log('File read failed : ', err);
                return;
            }
            try {

            });
        return formatTreesList;
    } catch (error) {
    }
}); */