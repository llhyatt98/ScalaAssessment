export function addHikers(hikers: any) {
    return {
        type: "ADD_HIKERS",
        payload: hikers,
    };
  }
  
export function addBridges(bridges: any) {
    return {
        type: "ADD_BRIDGES",
        payload: bridges,
    };
}

export function updateBridge(bridge: any) {
    return {
        type: "UPDATE_BRIDGE",
        payload: bridge,
    };
}