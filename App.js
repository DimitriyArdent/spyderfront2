/* eslint-disable */
import './App.css';
import AWS from 'aws-sdk';
import React, { useState, useEffect } from "react";
import SimpleForm from './Form'
import { targetWordSpotter, showTargetWordOccurences, createTreeObject, createSecondObject } from './functions/functions'
import io from 'socket.io-client';
import TreeMenu from 'react-simple-tree-menu';


function App() {

  const [targetWord, settargetWord] = useState('');
  const [res, setres] = useState([]);
  const [showTargetWordModal, setShowTargetWordModal] = useState(false)
  const [modalPhrases, setModalPhrases] = useState([])

  const socket = io("http://localhost:8001");

  useEffect(() => {
    socket.on('message', (data) => {
      let temp = JSON.parse(data)

      if (parseInt(temp.value.Depth) === 1) {
        let obj = createTreeObject(temp)[0]   // [{…}]
        setres(prev => [...prev, obj]);            // i want to iterate over ONE SINGLE NESTED OBJECT 
      }

      if (parseInt(temp.value.Depth) === 2) {
        const levelTwo = createSecondObject(temp, res)
        setres(levelTwo)
      }



    });



    return () => {
      socket.off('message');
    };
  }, [socket]);






  return (
    <>

      <SimpleForm settargetWord={settargetWord} ></SimpleForm>


      <TreeMenu
        cacheSearch
        // klicking the URL, this action open modal and pass phrases of this url to this modal
        onClickItem={({ key, label, phrases }) => {
          showTargetWordOccurences(key, label, phrases, setShowTargetWordModal, setModalPhrases)
        }}

        data={res}
        debounceTime={125}
        disableKeyboard={false}
        resetOpenNodesOnDataUpdate={false}
      />



      {showTargetWordModal && (
        <div  >

          <button onClick={() => setShowTargetWordModal(false)}>Close</button>
          <div>loli</div>
          <div>
            {modalPhrases.map((phrs) => {
              return <div>{phrs}</div>; // add a return statement here
            })}
          </div>

        </div>
      )}




    </>
  );
}

export default App;
