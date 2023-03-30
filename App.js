/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AWS from 'aws-sdk';
import React, { useState, useEffect } from "react";
import SimpleForm from './Form'



function App() {
  const [targetWord, settargetWord] = useState('for');
  const [res, setres] = useState([]);
  const [res2, setres2] = useState([]);

  const [testW, settestW] = useState('');
  const [selectedKey, setSelectedKey] = useState(null);
  const [firstBatchData, setfirstBatchData] = useState(true)
  const [responseReceived, setresponseReceived] = useState(false)

  const [effectflag, seteffectflag] = useState('----')



  let response = []


  const sqs = new AWS.SQS({
    region: 'us-east-1',
    accessKeyId: 'AKIARUXX3267DWG2UCCM',
    secretAccessKey: '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'
  });


  useEffect(() => {

    seteffectflag('+++++')

  }, [res]);



  async function waitingForFirstBatch() {   // iterating to receive the first layer, then stopped


    // RECIVING MESSAGE
    const params = {
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/113262712766/frontFromQueryer', // message that contains the first batch set
      MaxNumberOfMessages: 1,
    };



    /// RENDER MESSAGE DATA
    response = await sqs.receiveMessage(params).promise()


    if (response.Messages.length > 0) {
      setres(prevRes => [...prevRes, ...JSON.parse(response.Messages[0].Body)])
      setres2(prevRes => [...prevRes, JSON.parse(response.Messages[0].Body)])

      ///DELETING MESSAGE
      var deleteParams = {
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/113262712766/frontFromQueryer',
        ReceiptHandle: response.Messages[0].ReceiptHandle
      };
      await sqs.deleteMessage(deleteParams).promise();

    }
    else {
      //if (document.getElementsByClassName('row').length > 0) return
      waitingForFirstBatch()
    }


  }





  waitingForFirstBatch()


  return (
    <>
      <div>charlie teh unicorn</div>

      <button onClick={() => queryRedis()} >quer</button>
      <br></br>


      <SimpleForm></SimpleForm>

      <div>{effectflag}</div>

      {res && (
        <div>
          {res && (
            <div className='frame'>
              {res.map(obj => (
                <div className='row'>

                  <div onClick={() => setSelectedKey(prevKey => prevKey === obj.key ? null : obj.key)}  >{obj.key}</div>

                  {selectedKey === obj.key && (   // if selected url == url of phrases
                    <div>
                      <div onClick={(e) => advancedSearch(obj.key)}>get!!!!!!!!!</div>
                      {JSON.parse(obj.phrases).map(phrases => (

                        <div id='phrases' onClick={(e) => advancedSearch(obj.key)} className='phraseRow' key={phrases}>{targetWordSpotter(phrases)}</div>  // the phrases here (inside the f())
                      ))}
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