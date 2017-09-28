var quotes_arr = ["test1", "test2", "test3", "test4"];
var quotes_dict = {};
var data;
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
            data = JSON.parse(request.responseText);
            
            fill_quotes_dict();
            fill_select();
            add_quote();
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

function fill_select()
{
    var select = document.getElementById("author_select");
    
    var authors = Object.keys(quotes_dict).sort(); 
    
    for(var i = 0; i < authors.length; i++) 
    {
        var opt = authors[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function fill_quotes_dict()
{
    for( var i in data )
    {
        var q = data[i];
        // Process empty field of an author
        var author = q.quoteAuthor == "" ? "Unknown author" : q.quoteAuthor;
        // Remove invalid characters
        var text = q.quoteText.replace(/\uFFFD/g, '');
        author = author.replace(/\uFFFD/g, '');

        if( quotes_dict[author] === undefined )
        {
            quotes_dict[author] = new Set();
        }
        quotes_dict[author].add(text);
    }
}

window.onload = function()
{
    loadJSON();
}

function div_comparer(a, b) 
{
    if (a.innerHTML < b.innerHTML)
    {
        return -1;
    } else
    {
        return 1;
    }
}

function change_curr_quotes() 
{
    var quotes_div_arr = document.getElementsByClassName("quote_box");

    for ( var i = 0; i < quotes_div_arr.length; ++i )
    {
        var author = get_random_author();
        var quote = get_random_quote_of_author( author );

        quotes_div_arr[i].innerHTML = "<b><i>" + author + "</b></i><pre>" + quote + "</pre>";
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

function change_quotes()
{
    change_curr_quotes();
}

function clear_quotes() {
    var quotes_divs = document.getElementsByClassName("quote_box");

    for ( var i = quotes_divs.length-1; i >= 0; --i )
    {
        quotes_divs[i].remove();
    }
}

function add_quote()
{
    var author = get_random_author();
    var quote = get_random_quote_of_author( author );

    var new_div = document.createElement("div");
    new_div.className = "quote_box";
    new_div.innerHTML = "<b><i>" + author + "</b></i><pre>" + quote + "</pre>";

    document.getElementById("all_quotes_box").appendChild(new_div);
}

function show_author_quotes()
{
    clear_quotes();

    var author = document.getElementById("author_select").value;

    var set_of_quotes = quotes_dict[author];
    set_of_quotes.forEach(function add_quotes(value) {
        var new_div = document.createElement("div");
        new_div.className = "quote_box";
        new_div.innerHTML = "<b><i>" + author + "</b></i><pre>" + value + "</pre>";

        document.getElementById("all_quotes_box").appendChild(new_div);
    });

    sort_quotes();
}

// Get random author from dictionary of quotes
function get_random_author() {
    var i = parseInt(Math.random() * (Object.keys(quotes_dict).length - 0) + 0);
    return Object.keys(quotes_dict)[i];
}

// Get random quote of the given author from dictionary of quotes
function get_random_quote_of_author( author ) {
    var set = quotes_dict[author];
    var ln = set.size;
    var i = parseInt(Math.random() * (set.size - 0) + 0);
    return Array.from(quotes_dict[author])[i];
}
