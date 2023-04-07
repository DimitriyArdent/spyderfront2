/* eslint-disable */
import axios from 'axios';




export function targetWordSpotter(phrases, targetWord) {  // color the target word
    let temporarySplittedArray = phrases.split(new RegExp(targetWord, "i"))
    return <div   >
        <span className='nonTargetWord'>{temporarySplittedArray[0]}</span>
        <span className='targetWord'>{targetWord}</span>
        <span className='nonTargetWord' >{temporarySplittedArray[1]}</span>

    </div>


}



export function showTargetWordOccurences(key, label, phrases, setShowTargetWordModal, setModalPhrases) {
    setModalPhrases(phrases)
    setShowTargetWordModal(true)





}

export function createTreeObject(data) {

    const obj = []

    if (parseInt(data.value.Depth) === 1) {
        let firstLevelObject = {}               // first level URL that appears on screen after initial search
        firstLevelObject.key = data.selfKey
        firstLevelObject.label = data.selfKey
        firstLevelObject.phrases = JSON.parse(data.value.phrases)
        firstLevelObject.nodes = []
        for (let i = 0; i < JSON.parse(data.value.linksInThisUrl).length; i++) {
            let node = {}
            node.key = JSON.parse(data.value.linksInThisUrl)[i]
            node.label = JSON.parse(data.value.linksInThisUrl)[i]

            firstLevelObject.nodes.push(node)
        }

        obj.push(firstLevelObject)



        return obj
    }


}

export function createSecondObject(data, res) {
    if (parseInt(data.value.Depth) === 2) {

        //objects in array
        for (let i = 0; i < res.length; i++) {
            // nodes of this object
            for (let j = 0; j < res[0].nodes.length; j++) {

                if (res[i].nodes[j].key == data.selfKey) {
                    res[i].nodes[j].nodes = []      // creating nodes field for this node(object in nodes array of his father)
                    res[i].nodes[j].phrases = JSON.parse(data.value.phrases) // creating phrases field for this node(object in nodes array of his father)
                    // url's of the data object
                    for (let k = 0; k < JSON.parse(data.value.linksInThisUrl).length; k++) {
                        res[i].nodes[j].nodes.push({ key: JSON.parse(data.value.linksInThisUrl)[k], label: JSON.parse(data.value.linksInThisUrl)[k] })
                    }

                }
            }
        }

    }
    return res
}
