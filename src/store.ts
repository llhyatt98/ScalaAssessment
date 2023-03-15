import { createStore } from "redux";

interface AppState {
  hikers: any;
  bridges: any;
}

const initialState: AppState = {
  hikers: [],
  bridges: [],
};

function rootReducer(state: AppState = initialState, action: any) {
  switch (action.type) {

    case "ADD_HIKERS":
      return {
        ...state,
        hikers: action.payload,
      };

    case "ADD_BRIDGES":
      return {
        ...state,
        bridges: action.payload,
      };

    case "UPDATE_BRIDGE":
      const currentBridges = state.bridges.bridgeData;
      const bridgeIndex = currentBridges.findIndex((bridge: any) => bridge.id === action.payload.id);
      if(bridgeIndex){
        const selectedBridge = currentBridges[bridgeIndex];
        selectedBridge.hikers = action.payload.updatedBridgeState;
        currentBridges[bridgeIndex] = selectedBridge;

        return {
            ...state,
            bridges: { bridgeData: currentBridges }
        }
      }

      return state;

    default:
      return state;
  }
}

export const store = createStore(rootReducer);