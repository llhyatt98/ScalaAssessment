export const fastestTime = (hikers: any, bridges: any) => {
    console.log(hikers, bridges)
    let totalTime = 0;
    let bridgeTimes = [];
  
    let hikersAdded: any = []
    for (let i = 0; i < bridges.length; i++) {
        const bridge = bridges[i];
        // Check if there are additional hikers on this bridge
        let hikersOnBridge = hikers.filter((hiker: any) =>
            bridge.hikers.includes(hiker.id)
        );
    
        // Add these to our group of hikers
        hikersAdded = hikersAdded.concat(hikersOnBridge);
        hikersOnBridge = hikersAdded;

        // Sort hikers by speed
        hikersOnBridge.sort((a: any, b: any) => a.speed - b.speed);

        // Cross the bridge with two slowest hikers at a time
        let bridgeTime = 0;
        while (hikersOnBridge.length > 0) {
            if (hikersOnBridge.length === 1) {
                // Last hiker crosses alone
                bridgeTime += bridge.length / hikersOnBridge[0].speed;
                hikersOnBridge = [];
            } else {
                // Two slowest hikers cross together
                bridgeTime += Math.max(
                    bridge.length / hikersOnBridge[0].speed,
                    bridge.length / hikersOnBridge[1].speed
                );
                hikersOnBridge = hikersOnBridge.slice(2);
            }
        }

        totalTime += bridgeTime;
        bridgeTimes.push(bridgeTime);
    }
  
    return { totalTime, bridgeTimes };
  };
