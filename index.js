import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀

Practice accessing data by console.log-ing the following pieces of data note, 
you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
let result = fifaData.filter(data => data.Year === 2014 && data.Stage === "Final")[0]["Home Team Name"]
console.log(result)

//(b) Away Team name for 2014 world cup final
let result2 = fifaData.filter(data => data.Year === 2014 && data.Stage === "Final")[0]["Away Team Name"]
console.log(result2)

//(c) Home Team goals for 2014 world cup final
let result3 = fifaData.filter(data => data.Year === 2014 && data.Stage === "Final")[0]["Home Team Goals"]
console.log(result3)

//(d) Away Team goals for 2014 world cup final
let result4 = fifaData.filter(data => data.Year === 2014 && data.Stage === "Final")[0]["Away Team Goals"]
console.log(result4)

//(e) Winner of 2014 world cup final */
function winner(goalsAway ,goalsHome,awayTeam,homeTeam){
    if(goalsAway>goalsHome){
        return awayTeam; 
    } else { return homeTeam;};
}
console.log(winner(result4,result3,result2,result));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    let arr = [];
    data.forEach(function(item){
        if(item.Stage === "Final"){
             arr.push(item);
    };
        return arr;
    });
   return arr;
};

console.log("Task 2 - result");
console.log(getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr,fcCb) {
   let arr_years = [] ;
   fcCb(arr).forEach(function(item){
       arr_years.push(item.Year)
   });
   return arr_years;
}


console.log("Task 3 - result");
console.log(getYears(fifaData,getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr,fcCb) {
    let winners_arr = []
    fcCb(arr).forEach(function(item){
        let winner = "";
        if(item["Away Team Goals"]>item["Home Team Goals"]){ 
            winner = item["Away Team Name"];} else { winner = item["Home Team Name"]}
        winners_arr.push(winner);
    })
    return winners_arr;
}


console.log("Task 4 - result");
console.log(getWinners(fifaData,getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 
hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr,getYearsCb, getWinnersCb,getFinalscb){
    let years = getYearsCb(arr,getFinalscb);
    let winners = getWinnersCb(arr,getFinalscb);
    let arr_result = []
    years.forEach(item => { 
        let winner_team = winners[years.indexOf(item)];
        console.log(`In ${item}, ${winner_team} won the world cup!`)
    });
}

console.log("Task 5 - result");
console.log(getWinnersByYear(fifaData,getYears, getWinners,getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data 
 as an argument
 2. Return the the average number of the total home team goals and away team goals 
 scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(arr,getFinalsCb) {
   let finals = getFinalsCb(arr);
   let home_goals = [];
   let away_goals = [];
   const reducer = (accumulator, currentValue) => accumulator + currentValue;
   finals.forEach(item => {
    home_goals.push(item["Home Team Goals"]);
    away_goals.push(item["Away Team Goals"]);
   });

   let home_average = (home_goals.reduce(reducer)/home_goals.length).toFixed(2);
   let away_average = (away_goals.reduce(reducer)/away_goals.length).toFixed(2);
   
   return `Home Average: ${home_average} , Away Average: ${away_average}`

} // Closes function getAverageGoals

console.log("Task 6 - result");
console.log(getAverageGoals(fifaData,getFinals));

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and 
`team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(initials,data,getFinalscb,getWinnersCb) {
    let count = 0;
    let winners = getWinnersCb(data,getFinalscb);
    winners.forEach(item =>{
        if(item.startsWith(initials)){
            count++;
        };
    });
    return count;
}

console.log("Stretch 1");
console.log(getCountryWins("Br",fifaData,getFinals,getWinners));


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns 
the team with the most goals score per appearance (average goals for) 
in the World Cup finals */

function getGoals(data,getFinalsCb) {
    let finals_data = getFinalsCb(data);
    let countries = {};
    finals_data.forEach(item => {
        countries[item["Away Team Name"]] = 0;
        countries[item["Home Team Name"]] = 0;
    });
    let name = "";
    let goals = 0;
    Object.keys(countries).forEach(country => {
        var goal_count = 0 ;
        var appearence_count = 0 ;

        finals_data.forEach(item => {
            if (item["Away Team Name"] === country) {
                goal_count = goal_count + item["Away Team Goals"];
                appearence_count = appearence_count + 1 ;
            } 
            else if (item["Home Team Name"] === country){
                goal_count = goal_count + item["Home Team Goals"];
                appearence_count = appearence_count + 1 ;
            };        
        }); 
        if ((goal_count/appearence_count).toFixed(2) > goals){
            goals = (goal_count/appearence_count).toFixed(2);
            name = country;
        }
    }); 
    return `${name} : ${goals}`;
};
console.log("Stretch 2");
console.log(getGoals(fifaData,getFinals));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates 
the team with the most goals scored against them per appearance (average goals against) 
in the World Cup finals */

function badDefense(data,getFinalsCb){
    let finals_data = getFinalsCb(data);
    let countries = {};
    finals_data.forEach(item => {
        countries[item["Away Team Name"]] = 0;
        countries[item["Home Team Name"]] = 0;
    });
    let name = "";
    let goals = 0;
    Object.keys(countries).forEach(country => {
        var goal_count = 0 ;
        var appearence_count = 0 ;
        finals_data.forEach(item => {
            if (item["Away Team Name"] === country) {
                goal_count = goal_count + item["Home Team Goals"];
                appearence_count = appearence_count + 1 ;
            } 
            else if (item["Home Team Name"] === country){
                goal_count = goal_count + item["Away Team Goals"];
                appearence_count = appearence_count + 1 ;
            };        
        }); 
        if ((goal_count/appearence_count).toFixed(2) > goals){
            goals = (goal_count/appearence_count).toFixed(2);
            name = country;
        }
    }); 
    return `${name} : ${goals}`;

};

console.log("Stretch 3");
console.log(badDefense(fifaData,getFinals));

/* If you still have time, use the space below to work on any stretch goals
 of your chosing as listed in the README file. */

 //Create a function that takes country initials as a parameter and returns their 
 //total number of World Cup appearances. Account for ties in your 'finals' data set
 
 function getCountryapp(initials,data) {
    let count = 0;
     data.forEach(item =>{
        if (item["Home Team Name"].startsWith(initials) || item["Away Team Name"].startsWith(initials));{
            count ++;
        };
     });
    return count;
};

console.log("Stretch 1 BIS ");
console.log(getCountryapp("Br",fifaData));


 
 // Create a function that takes country initials as a parameter and determines 
 //how many goals that country has scored in World Cup games since 1930.

 function getCountrygoals(initials,data) {
    let count = 0;
     data.forEach(item =>{
        if (item["Home Team Name"].startsWith(initials) ) {
            count = count + item["Home Team Goals"]
        } else if (item["Away Team Name"].startsWith(initials)){
            count = count + item["Away Team Goals"]
        };
     });
    return count;
};

console.log("Stretch 2 BIS ");
console.log(getCountrygoals("Br",fifaData));

 //Use .map() to format country names into <h1> HTML headers.

function maph1(getFinalsCb,data){
    let finals_data = getFinalsCb(data);
    let countries = {};
    finals_data.forEach(item => {
        countries[item["Away Team Name"]] = 0;
        countries[item["Home Team Name"]] = 0;
    });
    var output = Object.keys(countries).map(function(key){
        return `<h1>${key}</h1>`;
    });
    return output;
}

console.log("Stretch 3 BIS ");
console.log(maph1(getFinals,fifaData));
 

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
