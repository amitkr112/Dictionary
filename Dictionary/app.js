//Implementation of Trie-Data Structure

// Taking the element from the HTML DOM

// for insetion
var btninsert = document.getElementById("btninsert")
var ins = document.getElementById("ins")

// For searching
var btnsearch = document.getElementById("btnsearch")
var cont = document.getElementById("cont")

// For finding by prefix
var btnfindbyprefix = document.getElementById("btnfindbyprefix")
var findall = document.getElementById("findall")


/*---------------------------------------------------*/
// IMPLEMENTATION OF TRIE FUNCTIONS

//Initialising the Trienodes
function TrieNode(key) {

    // this refers to the Trienode

    // Key value refers to the character
    this.key = key;

    // Pointing to the parent
    this.parent = null;

    // Containing hash values of the children
    this.children = {};

    // Ensures whether the node is at the end or not
    this.end = false;
}

// Iterates from the last to the first by the help of parent pointer
// if word = "ABC"  iterates from C to A
// Time complexity: O(n), where n = word length

TrieNode.prototype.getWord = function () {

    var output = [];
    var node = this;

    while (node !== null) {
        // Adding the elements to the front 
        output.unshift(node.key);
        node = node.parent;
    }

    // Joining the array elements into a string
    return output.join('');
};


// Implementing Trie with  root with null value
// This root will contain trienode object

function Trie() {

    // This refers to the Trie
    console.log(this)

    // Trie will cotain root element which will contain TrieNode
    this.root = new TrieNode(null);
}


// Inserting a word into the trie
// Time Complexity: O(n), where  n = word length
Trie.prototype.insert = function (word) {

    //Starting at the root
    var node = this.root;

    // for every character in the word
    for (var i = 0; i < word.length; i++) {

        // Checking whether the  character node exists in children or not
        if (!node.children[word[i]]) {

            // If it doesn't exist, we then create it.
            node.children[word[i]] = new TrieNode(word[i]);

            // Assigning the parent to the newly created child node.
            node.children[word[i]].parent = node;
        }

        // Proceed to the next word/depth in the trie.
        node = node.children[word[i]];

        // If the given character is the last node 
        if (i == word.length - 1) {

            //I yes, then we have to mark as the end of the word
            node.end = true;
        }
    }
};

// Searching for the whole word
// Time Complexity: O(n), n = word length
Trie.prototype.search = function (word) {

    //Starting at the root
    var node = this.root;

    // For every character in the word
    for (var i = 0; i < word.length; i++) {
        // Checking whether the  character node exists in children or not

        if (node.children[word[i]]) {
            // if it exists, proceed to the next depth of the trie.
            node = node.children[word[i]];
        } else {
            // If it doesn't exist, return false since ]there is not any valid 
            return false;
        }
    }

    // If we have finished iterating the whole word, check whether this is the complete word or not
    return node.end;
};

// Returns every word with given prefix
// Time Complexity: O(p + n), p = prefix length, n = number of child paths
Trie.prototype.findByPrefix = function (prefix) {

    //Starting at the root
    var node = this.root;
    var output = [];

    // For every character in the prefix
    for (var i = 0; i < prefix.length; i++) {

        // Ensurig there exist words with the given prefix the prefix has a word or not
        if (node.children[prefix[i]]) {
            node = node.children[prefix[i]];
        } else {
            // Not any word with the given prefix
            return output;
        }
    }

    // Finding all the words recursively
    findAllWords(node, output);

    return output;
};

// Recursive function to find all words in the given node.
function findAllWords(node, arr) {

    // base case, if node is at a word, push to output
    if (node.end) {
        arr.push(node.getWord());
    }

    // Iterating through each children, and calling findallwords function  recursively 
    for (var child in node.children) {
        findAllWords(node.children[child], arr);
    }
}




/*-----------------------------------------*/


// Initialising the trie 
var root = new Trie();

//Rendering the insertion operation after every click
btninsert.onclick = function () {

    // Taking the word to be inserted
    var word = ins.value;

    // Calling the insertion function
    root.insert(word)

    // Updating the brower with the message
    ins.value = `${word} inserted`
}

//Rendering the searching operation after every click
btnsearch.onclick = function () {

    // Taking the word to be seached
    var word = cont.value;

    // Calling the searching function
    var ans = root.search(word)

    // Updating the browser based on the response
    if (ans)
        cont.value = `Given dictionary contains ${word}`
    else
        cont.value = `Given dictionary does not contain ${word}`
}

//Rendering the findByPrefix operation after every click
btnfindbyprefix.onclick = function () {

    // Taking the prefix word to be operated
    var word = findall.value;

    // Calling the findByPrefix fucntion
    var ans = root.findByPrefix(word)

    if (ans.length === 0)
        findall.value = `No word starts with prefix ${word}`
    else if (ans.length === 1)
        findall.value = `Given word having prefix ${word} is ${ans}`
    else
        findall.value = `Given words having prefix ${word} are ${ans}`
}








