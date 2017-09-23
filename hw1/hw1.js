var quotes_arr = ["test1", "test2", "test3", "test4"];
var curr_quote = 0;

// Load external JSON without using jQuery
function loadJSON(path, success, error)
{
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json', true);

    request.onload = function() 
    {
        if (request.status >= 200 && request.status < 400) 
        {
            // Success!
            var data = JSON.parse(request.responseText);
        } 
        else 
        {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function() {
          // There was a connection error of some sort
    };
    
    request.send();
}

window.onload = function() {
    loadJSON();
    add_quote();
}

function div_comparer(a, b) {
    if (a.innerHTML < b.innerHTML) {
        return -1;
    } else {
        return 1;
    }
}

function change_curr_quotes() {
    var quotes_div_arr = document.getElementsByClassName("quote_box");

    for ( var i = 0; i < quotes_div_arr.length; ++i )
    {
        quotes_div_arr[i].innerHTML = quotes_arr[curr_quote];

        if( curr_quote+1 >= quotes_arr.length )
            curr_quote = 0;
        else
            curr_quote += 1;
    }
}

function sort_quotes() {
    // Get all divs with quotes
    var quotes_div_arr = Array.prototype.slice.call(document.getElementsByClassName("quote_box"));
    var frag = document.createDocumentFragment();
    
    // Sort them and add to the fragment
    quotes_div_arr.sort( div_comparer );
    quotes_div_arr.forEach(frag.appendChild, frag);

    // Add sorting quotes to the DOM 
    var all_quotes_div = document.getElementById("all_quotes_box"); 
    all_quotes_div.appendChild(frag); 
}

function change_quotes() {
    change_curr_quotes();
}

function add_quote() {
    var new_div = document.createElement("div");
    new_div.className = "quote_box";
    new_div.innerHTML = quotes_arr[curr_quote];

    if( curr_quote+1 >= quotes_arr.length )
        curr_quote = 0;
    else
        curr_quote += 1;

    document.getElementById("all_quotes_box").appendChild(new_div);
}

 
