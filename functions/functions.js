/* eslint-disable */



export function advancedSearch(e) {        // finds the hited URL
    axios.get('http://localhost:8001/get-data', {
        params: { targetLink: e }


    }).then((res) => {
        console.log(res)
    })

}


export function targetWordSpotter(phrases) {  // color the target word
    let temporarySplittedArray = phrases.split(targetWord)
    return <div   >
        <span className='nonTargetWord'>{temporarySplittedArray[0]}</span>
        <span className='targetWord'>{targetWord}</span>
        <span className='nonTargetWord' >{temporarySplittedArray[1]}</span>

    </div>


}


