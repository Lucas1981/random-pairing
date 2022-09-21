// Imports

const fs = require('fs');

// Variables

const rounds = 3;
const initialNumberOfCandidates = 29;
const numberOfCandidates = initialNumberOfCandidates + (initialNumberOfCandidates % 2); // Make sure the number is even
const pairings = [];

// Functions

const random = () => 1 + Math.floor(Math.random() * numberOfCandidates);

const alreadyRegisteredAsPair = (personOne, personTwo) =>
    pairings.some(record => record.some(([p1, p2]) => personOne === p1 && personTwo === p2));

const getTwoPeople = accountedFor => {
  let personOne = null;
  let personTwo = null;
  while (
      personOne === personTwo ||
      accountedFor.includes(personOne) ||
      accountedFor.includes(personTwo) ||
      alreadyRegisteredAsPair(personOne, personTwo)
  ) {
    personOne = random();
    personTwo = random();
  }
  
  const finalPersonOne = personOne > personTwo ? personTwo : personOne;
  const finalPersonTwo = personOne < personTwo ? personTwo : personOne;
  
  return { personOne: finalPersonOne, personTwo: finalPersonTwo }
};

const generateOutput = pairings =>
    pairings.map((pairing, index) =>
        `Round ${index + 1}\n\n${pairing.map(([a, b]) => `${a},${b}`).join('\n')}`
    ).join('\n\n');

// Main loop
      
for (let round = 0; round < rounds; round++) {
  pairings[round] = [];
  const accountedFor = [];
  while (accountedFor.length < numberOfCandidates) {
    const { personOne, personTwo } = getTwoPeople(accountedFor);
    pairings[round].push([personOne, personTwo]);
    accountedFor.push(personOne);
    accountedFor.push(personTwo);
  }
}

// Print to screen and file

const output = generateOutput(pairings);
console.log(output);
fs.writeFileSync('random-pairing.csv', output, 'utf-8');