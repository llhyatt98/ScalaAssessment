import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { addHikers, addBridges, updateBridge } from "./actions/actions";
import { fastestTime } from "./helpers/fastestPath";

function App() {
  const dispatch = useDispatch();

  const [bridgeLength, setBridgeLength]: any = useState(0);
  const [timeToCross, setTimeToCross]: any = useState(0);
  const [bridgeTimes, setBridgeTimes]: any = useState(0);
  const bridges = useSelector((state: any) => state.bridges);
  const hikers = useSelector((state: any) => state.hikers);

  useEffect(() => {
    // Get hikers
    fetch('/api/hikers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(hikers => {
        if(hikers) dispatch(addHikers(hikers));
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

    // Get bridges
    fetch('/api/bridges')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(bridges => {
        if(bridges) dispatch(addBridges(bridges));
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }, []);

  useEffect(() => {
    if(hikers.hikerData && bridges.bridgeData){
      const {totalTime, bridgeTimes}= fastestTime(hikers.hikerData, bridges.bridgeData);
      setTimeToCross(totalTime)
      setBridgeTimes(bridgeTimes)
    }
  }, [bridges, hikers])

  const handleInputChange = (event: any) => {
    setBridgeLength(parseInt(event.target.value));
  }

  const postBridge = () => {
    if(bridgeLength && bridgeLength > 0){
      const lastBridge = bridges.bridgeData[bridges.bridgeData.length - 1]

      const count = parseInt(lastBridge.id.slice(lastBridge.id.indexOf('_') + 1)) // Get the number from the hiker and increment
      const newBridge = {id: `bridge_${count + 1}`, length: bridgeLength, hikers: []}

      const updatedBridgeState = bridges.bridgeData;
      updatedBridgeState.push(newBridge)

      dispatch(addBridges({bridgeData: updatedBridgeState}));
    }
  }

  return (
    <div className="App" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 20}}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        maxWidth: 1200,
        border: '1px solid #E6E6E6',
        backgroundColor: 'white',
        padding: 20
      }}>
        {timeToCross ?
          <>
            <h3>Minimum time to cross all bridges:</h3>
            <h2>{timeToCross.toFixed(1)} minutes</h2>
          </>
        :
          null
        }

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          { bridges && bridges.bridgeData && bridges.bridgeData.map((bridge: any, index: number) => {
                return (
                  <Bridge 
                    bridge={bridge} 
                    hikers={hikers}
                    updated
                    bridgeTime={bridgeTimes && bridgeTimes[index] ? bridgeTimes[index] : 0}
                    key={index}
                  />
                )
            })
          }

          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <label style={{marginBottom: 5}}>
              Enter bridge length (ft):
            </label>
            <input type="number" value={bridgeLength} onChange={handleInputChange} style={{width: 100}}/>
            <button 
              style={{ backgroundColor: '#395D75', color: 'white', width: 120, height: 50, fontWeight: 'bold', borderRadius: 10, marginTop: 10}} 
              onClick={() => postBridge()}
            >
              Add Bridge
            </button>
          </div>

          <p>* Scroll horizontally to see hikers *</p>
        </div>
      </div>
    </div>
  );
}

function Bridge(props: any) {
  const [speed, setSpeed] = useState(0);
  const dispatch = useDispatch();
  const hikersState = useSelector((state: any) => state.hikers);

  if(!props?.bridge){
    return null;
  }

  const handleInputChange = (event: any) => {
    setSpeed(parseInt(event.target.value));
  }

  const postHiker = () => {
    if(speed > 0){
      const lastHiker = hikersState.hikerData[hikersState.hikerData.length - 1]

      const count = parseInt(lastHiker.id.slice(lastHiker.id.indexOf('_') + 1)) // Get the number from the hiker and increment
      const newHiker = {id: `hiker_${count + 1}`, speed}

      const updatedHikerState = hikersState.hikerData
      const updatedBridgeState = props?.bridge.hikers

      updatedHikerState.push(newHiker)
      updatedBridgeState.push(newHiker.id)

      dispatch(updateBridge({id: props.bridge.id, updatedBridgeState}))
      dispatch(addHikers({hikerData: updatedHikerState}))
    }
  }

  const hikers = props.bridge?.hikers;
  return (
    <div style={{display: 'flex', flexDirection: 'row', marginBottom: 50, alignItems: 'center', justifyContent: 'flex-start', border: '2px #E7E7E7', borderRadius: 10, padding: 10}}>
      {props.bridgeTime &&
        <div style={{marginRight: 20, minWidth: 100}}>
          <p>Cross Time:</p>
          <h3>{props.bridgeTime.toFixed(1)} min</h3>
        </div>
      }

      <div>
        <img src={require("./assets/bridge.png")} alt="provider" width={80} height={80} style={{borderRadius: 40}} />

        <div style={{textAlign: 'center'}}>
          <p style={{ fontWeight: 'bold', color: 'black', margin: '0 0'}}>{props.bridge.id}</p>
          <p style={{ color: 'black', marginTop: 10, marginBottom: 10, fontSize: 14}}>Length: {props.bridge.length}m</p>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', marginLeft: 20, marginRight: 20, minWidth: 140}}>
        <label style={{marginBottom: 5}}>
          Enter hiker speed (ft/m):
        </label>
        <input type="number" value={speed} onChange={handleInputChange} style={{width: 100}}/>
        <button style={{ backgroundColor: '#395D75', color: 'white', width: 100, height: 30, fontWeight: 'bold', borderRadius: 10, marginTop: 10}} onClick={() => postHiker()}>Add Hiker</button>
      </div>

      <div style={{display: 'flex', flexDirection: 'row', overflowX: 'scroll', whiteSpace: 'nowrap'}}>
        {hikers && hikers.length ?
          hikers.map((hiker: any, index: number) => {
            if(!hiker || !props.hikers) return null;

            const bridgeHiker = props.hikers.hikerData?.find((h1: any) => h1.id === hiker);
            if(bridgeHiker){
              return <Hiker hiker={bridgeHiker} key={index}/>
            }

            return null; 
          })
        :
          null
        }
      </div>
    </div>
  );
}

function Hiker(props: any) {
  if(!props.hiker || !props.hiker?.id){
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: "#F1F1F1", margin: 10, borderRadius: 10, paddingTop: 20, paddingBottom: 20}}>
      <div style={{ marginRight: '10px' }}>
        <img src={require("./assets/hiker.png")} alt="provider" width={50} height={50} style={{borderRadius: 40}} />
      </div>
      <div style={{marginLeft: 10, marginRight: 10}}>
        <div style={{textAlign: 'left'}}>
          <p style={{ fontWeight: 'bold', color: '#35E7F6', margin: '0 0'}}>{props.hiker.id}</p>
          <p style={{ color: 'black', marginTop: 10, marginBottom: 10, fontSize: 14}}>Speed: {props.hiker.speed}ft/m</p>
        </div>
      </div>
    </div>
  );
}

export default App;
