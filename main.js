// listen for form
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    // get form value
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    if(!siteName || !siteUrl){
        alert('Please i beg you fill the form biko');
        return false;
    }

    var bookmark ={
        name: siteName,
        url: siteUrl
    }

    // // local storage

    // localStorage.setItem('test', 'Hello World');
    // saving items in local storage to be display as strings
    if(localStorage.getItem('bookmarks') ===null){
        var bookmarks =[];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else{
       var bookmarks = JSON.parse (localStorage.getItem('bookmarks'));
    //    add bookmark to array
       bookmarks.push(bookmark);
    //    reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
       
    }

    // reset form
    document.getElementById('myForm').reset();
    fetchBookmarks();
   
     
// prevent form from submitting
   e.preventDefault(); 
}

// delete bookmark function
function deleteBookmark(url){
    // get local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmark
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url==url){
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    // reset to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // refetch bookmarks
    fetchBookmarks();

}
// fecth bookmarks
function fetchBookmarks(){
    // getbookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get output id
  var   bookmarksResults = document.getElementById('bookmarksResults');

//     // build output
    bookmarksResults.innerHTML = '';
    for(var i = 0;i < bookmarks.length; i++ ){
        var name= bookmarks[i].name;
        var url = bookmarks[i].url;

     bookmarksResults.innerHTML += '<div class="result">'+
                                '<h3>'+name+
                                 '<a class="btn2" target="_blank" href="'+url+'">Visit</a> ' + '<a onclick="deleteBookmark(\''+url+'\')" class="btn3" href="#">Delete</a> ' +
                                 '</h3>'+
                                 '</div>';
    }
}
