/* eslint-disable */
import './App.css';
import AWS from 'aws-sdk';
import React, { useState, useEffect } from "react";
import SimpleForm from './Form'
import { targetWordSpotter, advancedSearch } from './functions/functions'


function App() {
  const [targetWord, settargetWord] = useState('');
  const [res, setres] = useState([]);
  const [advancesRes, setadvancesRes] = useState([]);

  const [testW, settestW] = useState('');
  const [selectedKey, setSelectedKey] = useState(null);
  const [firstBatchData, setfirstBatchData] = useState(true)
  const [responseReceived, setresponseReceived] = useState(false)




  let response = []
  let advancedResponse = []





  async function waitingForFirstBatch() {   // iterating to receive the first layer, then stopped


    // RECIVING MESSAGE
    const params = {
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/113262712766/frontFromQueryer', // message that contains the first batch set
      MaxNumberOfMessages: 1,
    };



    /// RENDER MESSAGE DATA
    response = await sqs.receiveMessage(params).promise()

    if (response.Messages.length > 0) {
      console.log(JSON.parse(response.Messages[0].Body))

      setres(prevRes => [...prevRes, ...JSON.parse(response.Messages[0].Body)])
      ///DELETING MESSAGE
      var deleteParams = {
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/113262712766/frontFromQueryer',
        ReceiptHandle: response.Messages[0].ReceiptHandle
      };
      await sqs.deleteMessage(deleteParams).promise();

    }


    waitingForFirstBatch()



  }



  waitingForFirstBatch()


  async function waitingForNextBatches() {
    // RECIVING MESSAGE
    const params = {
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/113262712766/Advanced_Frontfromqueryer', // message that contains the first batch set
      MaxNumberOfMessages: 1,
    };


    advancedResponse = await sqs.receiveMessage(params).promise()
    if (advancedResponse?.Messages?.length > 0) {
      // what we have there: array of objects, each object has depth, array of word occurences, and his father URL
      // now we need to find the father url on the screen, and insert each one of doughter url's with the phrases that belongs to this url
      let resNextLevels = JSON.parse(advancedResponse.Messages[0].Body)  // new level
      /*
            if (parseInt(resNextLevels[0].values.Depth) === 2 && response.Messages != []) {              // if level 2
      
              let oldArray = JSON.parse(response.Messages[0].Body)            // get the initial array (res == [] no clue why)
      
              let matchingObject = oldArray.find(oldar => oldar.key === resNextLevels[0].fatherUrl) // if level 1 key url == father url of level 2
      
              matchingObject.children = resNextLevels  // inserting into previous level object new field that contain all of his URLs
      
              setres(oldArray)  // one object in this array was altered
              return;
            }*/
      console.log('hi')

    }



  }









  return (
    <>
      <div>charlie teh unicorn</div>

      <button onClick={() => queryRedis()} >quer</button>
      <br></br>


      <SimpleForm settargetWord={settargetWord} ></SimpleForm>


      {res && (
        <div>
          {res && (
            <div className='frame'>
              {res.map(obj => (
                <div className='row'>

                  <div onClick={() => setSelectedKey(prevKey => prevKey === obj.key ? null : obj.key)}  >{obj.key}</div>

                  {selectedKey === obj.key && (   // if selected url == url of phrases
                    <div>
                      <div className='cursor' onClick={(e) => advancedSearch(obj.key, obj.depth)}>get!!!!!!!!!</div>
                      {JSON.parse(obj.phrases).map(phrases => (

                        <div id='phrases' className='phraseRow' key={phrases}>{targetWordSpotter(phrases, targetWord)}</div>  // the phrases here (inside the f())
                      ))}


                      {res.hasOwnProperty('children') &&

                        res.children.map((grandchild) => {
                          <div className='right'>
                            <div>{grandchild.values.phrases}</div>
                            <div>{grandchild.values.Depth}</div>
                          </div>
                        })

                      }








                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      )}



    </>
  );
}

export default App;






/*



  async function waitingForFirstBatch() {   // iterating to receive the first layer, then stopped


    // RECIVING MESSAGE
    const params = {
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/113262712766/frontFromQueryer', // message that contains the first batch set
      MaxNumberOfMessages: 1,
    };



    /// RENDER MESSAGE DATA
    response = await sqs.receiveMessage(params).promise()


    if (response && response.Messages.length > 0) {
      setres(JSON.parse(response.Messages[0].Body))


      ///DELETING MESSAGE
      var deleteParams = {
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/113262712766/frontFromQueryer',
        ReceiptHandle: response.Messages[0].ReceiptHandle
      };
      await sqs.deleteMessage(deleteParams).promise();

      return
    } else if (res != null) {
      return
    }
    else {
      setTimeout(waitingForFirstBatch, 1000)
    }


  }
*/