#!/usr/bin/env node

import axios from "axios";
import chaclkAnimation from "chalk-animation"
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

var args = process.argv.slice(2); //slice 2 because the first 2 arguments are always node + app 
const sleep = (ms=2000)=> new Promise((r)=>setTimeout(r,ms))
async function welcome(){
    console.clear()
    const rainbowTitle = chaclkAnimation.rainbow(`Hello there lovely person`)
    await sleep()
    console.log(args)
    console.log(args[1])
    handleAnswer(args)
   
}
async function handleAnswer(input){
    const spinner = createSpinner("Generating random quote from random ass site...").start();
    await sleep();
    spinner.success({text:`Here's your quote ${playerName}`})

    // getInspirationalFact();
    switch(input[0]){
        case "random":
            getRandomFact()
            break;
        case "inspirational":
            getInspirationalFact()
            break;
        case "--animal":
            getRandomAnimalFact(input[1])
            break;
        default:
            console.clear() 
            spinner.error({text:`Error invalid arguments\n Available arguments: random,inspirational,--animal "animal type"`});
            process.exit(1)
    }

    showQuote()
}

function getRandomFact(){
    axios.get('https://uselessfacts.jsph.pl//random.json?language=en')
    .then((response)=> {
  //success
     console.log(response.data.text)
   })
    .catch(function (error) {
  // handle error
    console.log("This animal s");
  })
    .then(function () {
  // always executed
    });
}
function getRandomAnimalFact(animal){
    axios.get(`https://some-random-api.ml/facts/${animal}`)
    .then((response)=> {
  //success
    console.log(response.data.fact)
   })
    .catch(function (error) {
  // handle error
    console.log("Animal is not in list try one of the following:\n Cat, Dog, Panda, Fox, Bird, Koala");
  })
    .then(function () {
  // always executed
    });
}
function getInspirationalFact(){
    axios.get('https://zenquotes.io/api/random')
    .then((response)=> {
  //success
    console.log(response.data[0].q)

   })
    .catch(function (error) {
  // handle error
    console.log(error);
  })
    .then(function () {
  // always executed
    });
}

function showQuote(){
    console.clear();
    const msg = `Fancy Fact: `
    figlet(msg,(err,data)=>{
        console.log(gradient.pastel.multiline(data))
    })
}
await welcome()
