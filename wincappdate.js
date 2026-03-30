'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();

// Your code here

let runAgain = false;

do {
    console.log('\n======================================');
    console.log('  Testing Winc Matchmaker');
    console.log('======================================');
    console.log('1. Use a Profile Built-in (Fast Test)');
    console.log('2. Enter data manually');
    console.log('3. Exit');
    
    let choice = prompt('Choose an option (1-3): ');
    
    if (choice === '3') {
        console.log('Exiting the program...');
        break; // Stop running
    }

    // variables to hold user data, initialized with default values for the built-in profile
    let firstName = '', lastName = '', age, userGender, userGenderPreference, locationPreference, minAgeInterest, maxAgeInterest;

    if (choice === '1') {
        console.log('\n[!] Using built-in profile: John Doe, 30 years old. Prefers M/F(B), City, interested in people between 25 and 48 years old.');
        firstName = 'John';
        lastName = 'Doe';
        age = 30;
        userGender = 'M';
        userGenderPreference = 'B';
        locationPreference = 'city';
        minAgeInterest = 25;
        maxAgeInterest = 48;
    } else if (choice === '2') {
        while (!firstName) {
            firstName = prompt('What is your name? ');
            if (!firstName.trim()) {
                console.log('Name is required.');
                firstName = '';
            }
        }

        lastName = prompt('What is your last name? ');

        while (true) {
            const ageInput = prompt('What is your age? ');
            age = Number(ageInput);
            if (!isNaN(age) && age > 0) {
                break; // Exit the loop if a valid age is entered
            } else {
                console.log('Please enter a valid number for your age.');
            }
        }
    } else {
        console.log('\nInvalid option. Please try again.');
        runAgain = true;
        continue; //  Go back to the beginning of the do...while loop
    }

    // User input for first name, last name and age
    let userData = {
        firstName: firstName.trim(),
        lastName: lastName,
        age: age,
        validateAge: function() {
            if (this.age < 18) {
                console.log('You are not old enough to use this application');
                return false;
            } else {
                return true;
            }
        }
    }

    if (userData.validateAge()) {
        console.log(`\nWelcome ${userData.firstName} ${userData.lastName}!`);

        // If the test is "Manual", we ask for the other information, otherwise the variables are already defined
        if (choice === '2') {
            // Get the user's gender and preference for matching
            const validGenders = ['M', 'F', 'X'];
            while (true) {
                userGender = prompt('What is your gender? (M, F, X) ').toUpperCase();
                if (validGenders.includes(userGender)) break;
                console.log('Invalid input. Please enter M, F, or X.');
            }
            
            const validPreferences = ['M', 'F', 'X', 'B'];
            while (true) {
                userGenderPreference = prompt('What is your gender preference? (M, F, X, B) ').toUpperCase();
                if (validPreferences.includes(userGenderPreference)) break;
                console.log('Invalid input. Please enter M, F, X, or B.');
            }
            
            // Get the user's filtering criteria for partners
            console.log('\nNow, tell us what you are looking for...');
            while (true) {
                locationPreference = prompt('Which location do you prefer? (city or rural) ').toLowerCase();
                if (locationPreference === 'city' || locationPreference === 'rural') break;
                console.log('Invalid input. Please enter "city" or "rural".');
            }

            while (true) {
                const minAgeInput = prompt('What is the minimum age you are interested in? ');
                minAgeInterest = Number(minAgeInput);
                if (!isNaN(minAgeInterest) && minAgeInterest >= 18) break;
                console.log('Please enter a valid age (18 or older).');
            }

            while (true) {
                const maxAgeInput = prompt(`What is the maximum age you are interested in? `);
                maxAgeInterest = Number(maxAgeInput);
                if (!isNaN(maxAgeInterest) && maxAgeInterest >= minAgeInterest && maxAgeInterest <= 100) break;
                console.log(`Please enter a valid age older than or equal to ${minAgeInterest} and not older than 100.`);
            }
        }

        userData.gender = userGender;
        userData.gender_preference = userGenderPreference;
        
        // Apply all filters to find matches
        const filteredData = mockData.filter(person => {
            // 1. Does the person's gender match the user's preference?
            const genderMatch = userData.gender_preference === 'B' ? (person.gender === 'M' || person.gender === 'F') :
                                userData.gender_preference === 'X' ? ['M', 'F', 'X'].includes(person.gender) :
                                userData.gender_preference === person.gender;
            
            // 2. Is the user's age within the person's desired age range?
            const userAgeMatch = userData.age >= person.min_age_interest && userData.age <= person.max_age_interest;

            // 3. Is the person's age within the user's desired age range?
            const personAgeMatch = person.age >= minAgeInterest && person.age <= maxAgeInterest;

            // 4. Does the person's location match the user's preference?
            const locationMatch = person.location.toLowerCase() === locationPreference;

            return genderMatch && userAgeMatch && personAgeMatch && locationMatch;
        });

        console.log('\nHere are your matches:');
        if (filteredData.length > 0) {
            console.table(filteredData);
            console.log(`We found ${filteredData.length} matches for you!`);
        } else {
            console.log('Sorry, no matches found with your criteria.');
        }
    }

    /*T.M.G.C*/
    // At the end, the professor can decide if the app continues running for another test or if it stops. We ask the user if they want to run the program again.
    let again = prompt('\nWould you like to run the program again? (y/n) ').toLowerCase();
    runAgain = again === 'y';

} while (runAgain);
