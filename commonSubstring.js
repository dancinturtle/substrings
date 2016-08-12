//given an array of strings, find the longest substring that all the strings have in common

function commonSubstring (array, minstring, substrings, maxsublen){
  //first find the shortest string of them all
  var len = array.length;
  if(len == 1){
    //if there is only one string in the array, we're already done
    return "The longest substring is: " + array;
  }
  if(minstring === undefined){

    var minstring = array[0];
    var minindex = 0;
    var i = 0;
    do {
      if (array[i].length < minstring.length){
        minstring = array[i];
        minindex = i;
      }
      i++;
    }
    while (i<len);
    //move the shortest string to the front of the array
    if(minindex != 0){
      var temp = array[0];
      array[0] = minstring;
      array[minindex] = temp;
    }
  }

  if(substrings === undefined){
    substrings = [];
  }
  if(maxsublen === undefined){
    maxsublen = 0;
  }
  var minlength = minstring.length;
  var k;
  //start at the second string in the array, slice it into a piece the same length as the minimum string
  for(k=1; k<len; k++){
    for(var j=0; j<=array[k].length-minlength; j++){
      var exists = false;
      if(array[k].slice(j, j+minlength) == minstring){
        //if the slice is the same as the minimum string, we know that's a common substring, set exists to true
        exists = true;
        //break from this string and move on to the next
        break;

      }
      //if we get to the last segment of this string and exists is still false, this is a useless substring
      if(j==array[k].length-minlength && exists == false){
        //get out of checking this substring entirely by setting k outside of the range of the outer loop
        k = len;
        break;
      }
    }
  }
  //we exited this loop either by forcing it or by having a successful run with that substring. Determine how we exited by looking at the exists boolean
  if(exists == false){
    //forced out, the substring was useless, do not add it to our possibilities
    //get a new minstring by removing the first letter from the current one
    minstring = minstring.slice(1, minlength);
    //run the function again with this new minstring
    return commonSubstring(array, minstring, substrings, maxsublen);
  }
  else {
    //successfully finished the loop with a good substring
    //see if this substring is long enough to keep
    if(minstring.length >= maxsublen){
      //the substring is longer than our previous substring, make this the new count
      maxsublen = minstring.length;
      //see if there are any substrings saved yet
      var substringlen = substrings.length;
      if (substringlen > 0){
        //if there are strings already saved, find out if any of them already match our current substring
        var match = false;
        for(var g=0; g<substringlen; g++ ){
          //loop through the substrings array and remove any that are too short
          if (substrings[g].length < maxsublen) {
            removeAtIndex(substrings, g);
          }
          //if any match the curent one, take note of that, we don't want to bother putting it in our array if it's already there
          if(substrings[g]==minstring){
            match = true;
          }
        }
      }
      if(match == false || substringlen == 0){
        //only if the substring doesn't already exist, or if there's nothing in the array at all, will we add the current substring
        substrings.push(minstring);
      }
    }
    //now it's time to whittle down the first string in the array and look at subsets of that string
    if(array[0].length != 0){
      //as long as that string is not already whittled all the way down, remove the last character
      array[0] = array[0].slice(0, array[0].length-1);
      minstring = array[0];
      //repeat the function with this new minstring
      return commonSubstring(array, minstring, substrings, maxsublen);
    }
    else {
      //if we've already explored all possibilities with the first string, just focus on the substrings array
      //if it only has one string, return that one
      if(substrings.length == 1){
        return "The longest substring is: " + substrings;
      }
      else {
        //if it has more than one string, they are substrings of equal length and should all be returned
        return "The longest substrings are: " + substrings;
      }

    }
  }
}

function removeAtIndex(array, index){
  var temp = array[index];
  for(var i=index; i<array.length; i++){
    array[i] = array[i+1];
  }
  array[array.length-1]=temp;
  array.pop();
  return array;
}

testArray = ["palindrome", "slinkyome", "pralineome"];
var start = new Date().getTime();
console.log(commonSubstring(testArray));
var end = new Date().getTime();
var time = end - start;
console.log("Execution time", time);
