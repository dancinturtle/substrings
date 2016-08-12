//given an array of strings, find the longest substring that all the strings have in common
function commonSubstringNoRec(array){
  if(array.length == 1){
    return "The common substring is: " + array[0];
  }
  var minstring = array[0];
  var minindex = 0;
  var substrings = [];
  for (var i=0; i<array.length; i++){
    if (array[i].length < minstring.length){
      minstring = array[i];
      minindex = i;
    }
  }
  //move the shortest string to the front of the array
  if(minindex != 0){
    var temp = array[0];
    array[0] = minstring;
    array[minindex] = temp;
  }

//set a loop that will have to be done as many times as there are characters in the shortest string
  for(var l = 0; l<=array[0].length; l++){
    //set this shortest string's length in order to make the right slices
    var minlength = minstring.length;
    //go through each string in the array
    for(var k=1; k<array.length; k++){
      //take slices of each word the same length as the shortest string, see if they are identical
      for(var j=0; j<=array[k].length-minlength; j++){
        //set exists boolean to false
        var exists = false;
        //if the slice is equal to minstring, set the boolean to true, we're done with this word, move on to the next
        if(array[k].slice(j, j+minlength) == minstring){
          exists = true;
          break;
        }
        //if we get to the end of the word and boolean is still false, this substring is useless
        if(j==array[k].length-minlength && exists == false){
          //get out of the outer loop by setting k out of range and break
          k = array.length;
          break;
        }
      }
    }
    //when we exist this loop, it's because k > array.length, exists is either true or false
    if(exists == true){
      //exists is true, so the substring is a good one, push it into the substrings array if the array is empty
      if(substrings.length == 0){
        substrings.push(minstring);
      }
      //go through the substrings array and the minstring is too short or if it already exists in the substrings array, change the add boolean to false
      for(var x=0; x<substrings.length; x++){
        var add = true;
        if(substrings[x].length > minstring.length || substrings[x] == minstring){
          add = false;
        }
      }
      if(add == true){
        //only add the minstring if it's long enough and is unique
        substrings.push(minstring);
      }
    }
    if(minstring.length > 0){
      //if it's possible, remove the first character from the minstring
      minstring = minstring.slice(1, minlength);
    }
    else if (minstring.length == 0){
      //otherwise, look at the first string in the array, and if that is not empty, drop the last character
      if(array[0].length > 0){
        array[0] = array[0].slice(0, minlength-1);
        minstring = array[0];
        //have to set l to -1 because it will be incremented right away to 0, want to repeat the loop
        l=-1;
      }
      else {
        //if the first string in the array is empty, focus only on the substrings array
        var maxsub = substrings[0];
        //assume the first string in substrings array is the longest
        for(var f=0; f<substrings.length; f++){
          if(substrings[f].length > maxsub.length){
            //reassign longest string if a string in the array is longer
            maxsub = substrings[f];
          }
        }
        maxlength = maxsub.length;
        var allmaxsubs = [maxsub];
        //there may be more than one string tying for longest substring
        for(var c=0; c<substrings.length; c++){
          var match = false;
          for(var d=0; d<allmaxsubs.length; d++){
            //keep track of whether each string has already been pushed into allmaxsubs array
            if(substrings[c] == allmaxsubs[d]){
              match = true;
            }
          }
          if(match == false && substrings[c].length == maxlength){
              //only put it into allmaxsubs array if the string is unique
            allmaxsubs.push(substrings[c]);
          }
        }
        if(allmaxsubs.length == 1){
          //if there's only one string in allmaxsubs array, return it
          return "The longest substring is: " + allmaxsubs;
        }
        else {
          //if there are more, then they are equally long, equally valid, all should be returned
          return "The longest substrings are: " + allmaxsubs;
        }
      }
    }
  }
}

// testArray = ["palindrome", "slinkyome", "pralineome"];
testArray = ["aba", "aca", "ada", "afa"];
var start = new Date().getTime();
console.log(commonSubstringNoRec(testArray));
var end = new Date().getTime();
var time = end - start;
console.log("Execution time", time);
