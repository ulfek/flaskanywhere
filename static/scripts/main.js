let myHeading = document.querySelector('h1');
myHeading.textContent = "Hello world!";

function addTag() {
    var url = 'https://script.google.com/macros/s/AKfycbxRQBqm9qqjbTNjLQLU56yZqD9uHppYCDkT7yME0EG25FjKcQw/exec';
    var tag = document.getElementById('tag').value;
    var category = document.getElementById('category').value;
    //var params = 'action=addItem&itemName=test&brand=testBrand';

    response.innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        // The following conitional check will not work locally - only on a server
        if(xhr.status === 200) {
            // alert(xhr.responseText);
            response.innerHTML = xhr.responseText;
        }
        else {
            response.innerHTML = "ERROR: XMLHttpRequest";
        }
    };
    xhr.onerror = function() { // only triggers if the request couldn't be made at all
        response.innerHTML = "Network Error";
    };

    xhr.open('POST', url+"?action=addTag&tag=" + tag + "&category="+category);
    // xhr.open('GET', url+"?action=getTags&tagName=tag");
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhr.setRequestHeader("Content-type", "application/json");
    // xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
    // xhr.send(params);
    // xhr.send("action=addItem&itemName=test&brand=" + document.getElementById('brand').value );
    // xhr.send("action=addItem&itemName=test&brand=" + "Nisse");
    // xhr.send("action=addTag&tagName=tag");
    xhr.send(null);
    
}

function getTags() {
    var url = 'https://script.google.com/macros/s/AKfycbxRQBqm9qqjbTNjLQLU56yZqD9uHppYCDkT7yME0EG25FjKcQw/exec';
    
    //var params = 'action=addItem&itemName=test&brand=testBrand';

    response.innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        // The following conitional check will not work locally - only on a server
        if(xhr.status === 200) {
            // alert(xhr.responseText);
            response.innerHTML = xhr.responseText;
        }
        else {
            response.innerHTML = "ERROR: XMLHttpRequest";
        }
    };
    xhr.onerror = function() { // only triggers if the request couldn't be made at all
        response.innerHTML = "Network Error";
    };
    xhr.open('GET', url+"?action=getTags");
    //Send the proper header information along with the request
    // xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
    // xhr.send(params);
    // xhr.send("action=addItem&itemName=test&brand=" + document.getElementById('brand').value );
    // xhr.send("action=addItem&itemName=test&brand=" + "Nisse");
    // xhr.send("action=addTag&tagName=tag");
    xhr.send(null);
}

var br = document.createElement('BR');
document.body.appendChild(br);

var addTagButton = document.createElement('BUTTON');
addTagButton.innerHTML = "Add tag"
document.body.appendChild(addTagButton);
addTagButton.onclick = addTag;

var getTagsButton = document.createElement('BUTTON');
getTagsButton.innerHTML = "Get tags"
document.body.appendChild(getTagsButton);
getTagsButton.onclick = getTags;

var response = document.createElement('DIV');
response.setAttribute('id','status');
response.innerHTML = "";
document.body.appendChild(response);
//button.addEventListener('click', addTag,false);
