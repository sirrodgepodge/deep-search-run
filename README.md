# deep-search-run

Tests each property on a javascript object with a test function and run a separate function if that test passes, 
returns a promise when said function has been run on all properties where test has returned true.

```js
var exampleObject = { 
  check: 'me',
  checkcheck: 'meme',
  imDeep: { 
    check: 'metoo' 
  }
};

// define function to test property with, the following will get fed to this function,
// obj: the object that is the direct parent of the current property (meaning 'obj' could be an object nested inside the object passed into 'deepSearchRun')
// prop: the current property's name
var matchFunc = function(obj, prop) {
  return val.indexOf('check') > -1;
}

// define function to be run on properties that return true to from the match function, the following will get fed to this function,
// callback: use this callback to say when the run function is complete, allows for async 'run' function, just run this with null for success or an error for error (just one argument)
// obj: the object that is the direct parent of the current property (meaning 'obj' could be an object nested inside the object passed into 'deepSearchRun')
// prop: the current property's name
// additionalArguments: any additional arguments passed into 'deepSearchRun' will be passed in order to the end of the 'runFunc' arguments
var runFunc = function(callback, obj, prop, additionalArgument1, additionalArgument2) {
  // if error run callback with error, errors log: 'Error running promise on this property: ', prop,'  Error: ', passedInError
	if('there is an error') return callback(new Error('there was an error'));
	console.log(obj[prop]);
	callback(null); // if no error just run callback with null
}

// returns a promise that resolves to the object passed in (which will have any updates from 'runFunc')
deepSearchRun(matchFunc, blah, runFunc).then(function(updatedBlah){
	console.log(updatedBlah);
});
```

[![NPM][nodei-image]][nodei-url]

[nodei-image]: https://nodei.co/npm/deep-search-run.png?downloads=true&downloadRank=true&stars=true
[nodei-url]: https://www.npmjs.com/package/deep-search-run
