/* eslint-disable */
import axios from 'axios';


export function advancedSearch(clickedURL, depth) {        // finds the hited URL
    axios.get('http://localhost:8001/get-data', {
        params: { targetLink: clickedURL, depth: depth }


    }).then((res) => {
        console.log(res)
    })

}


export function targetWordSpotter(phrases, targetWord) {  // color the target word
    let temporarySplittedArray = phrases.split(new RegExp(targetWord, "i"))
    return <div   >
        <span className='nonTargetWord'>{temporarySplittedArray[0]}</span>
        <span className='targetWord'>{targetWord}</span>
        <span className='nonTargetWord' >{temporarySplittedArray[1]}</span>

    </div>


}


