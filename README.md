# Notes:
Strategy:
I added a method for calculating overall time and times for each bridge. The approach was as follows:
- Iterate over each bridge
- Take into account the additional hikers for that bridge, add them to the current group of hikers
- Sort hikers by speed, and if there are multiple hikers move in teams of two starting with the slowest
- Include overall time and individual bridge times

- From a UI standpoint, I wanted to keep it as simple as possible while adding functionality to add more hikers and bridges

Things I would have done if I had more time:
- Testing. Due to time constraints, I was limited in providing testing. This is a great opportunity to spin up some unit tests for an expected solution and base cases.
- Handling edge cases: I tried to handle these but its not bullet proof. You can't add hikers with 0 speed, or bridges with 0 length. I'm sure with more testing I may have missed something.
- Better redux architecture: I was moving fast so my reducers are a little messy. I would have moved some of the postHiker/postBridge logic into the redux middleware. My approach was simplest given the time constraints.
- Better data typing: I focused on functionality over TypeScript interfacing, but if I had more time I would have added interfaces starting with the scala-api.ts and through the App components. This would include dedicated typing for what a hiker and bridge should look like.
- Performace: From my initial testing I believe the algorithm should function, but I would love to spend more time on decreasing complexity and trying to improve performance. This would only become an issue with a large number of bridges and hikers.
- Ability to delete bridges or hikers 



# Scala Full Stack Take-Home Challenge:
Write a program that simulates a team hiking through a forest at night. The team encounters a
series of narrow bridges along the way. At each bridge they may meet additional hikers who
need their help to cross the bridge.

The narrow bridge can only hold two people at a time. They have one torch and because it's
night, the torch has to be used when crossing the bridge. Each hiker can cross the bridge at
different speeds. When two hikers cross the bridge together, they must move at the slower
person's pace.

Determine the fastest time that the hikers can cross each bridge and the total time for all
crossings. The input to the program will be a yaml/JSON file that describes the speeds of each
person, the bridges encountered, their length, and the additional hikers encountered along the
way. Your solution should assume any number of people and bridges can be provided as
inputs.

Demonstrate the operation of your program using the following inputs: the hikers cross 3
bridges, at the first bridge (100 ft long) 4 hikers cross (hiker A can cross at 100 ft/minute, B at 50
ft/minute, C at 20 ft/minute, and D at 10 ft/minute), at the second bridge (250 ft long) an
additional hiker crosses with the team (E at 2.5 ft/minute), and finally at the last bridge (150 ft
long) two hikers are encountered (F at 25 ft/minute and G at 15 ft/minute).

## Engineering Requirements:
* Setup HTTP server to serve the API Data for the Client/Server implementation below
* Setup API endpoint(s) to serve data required to complete task below
    ○ Initial Array of hiker data (ID, speed)
    ○ Initial Array of Bridge data (length, number of hikers)
* Create Stand-alone React UI that to run using API data to demonstrate results below
    ○ Input for adding Bridges
        ■ Bridge length
        ■ Total Hikers crossing the bridge
    ○ Inputs for Hikers
        ■ ID
        ■ Speed
    ○ Results
        ■ Per Bridge results (length, number of hikers, ID of hikers, total time taken)
        ■ Total time taken to cross all bridges
* UI Constraint: The UI must be built using React and include a Redux layer responsible
for managing the state of the UI and act as middleware for all API calls.

## You will be evaluated on the following:
1. Strategy(s) - there are several ways to solve the problem, you can provide more than
one. The goal is to show us how you think.
2. Architecture and design- we want to see how well you architect and design solutions to
complex problems.
3. Testing - we want to see how you approach testing of the solution.
4. Standards and best practices.
5. Explanation - as an engineer at Scala, you may be working with and mentoring other
engineers. How well you can describe and explain your solution is very important