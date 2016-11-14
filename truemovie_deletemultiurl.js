// 要使用的db
db = connect("10.120.28.17:27018/truemovie");

// 當.js跑完後，將結果顯示在console shell的function
var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

// 有44部電影，的url內是37個url的list，用size找出來
cursor = db.truemovie_copy.find({ "url" : { "$size" : 37}});

// cursor 使用forEach給function，對每個cursor做動作
cursor.forEach(function(d){
		db.truemovie_copy.remove(d) // 把在atmovieFilm_Test每個cursor刪除
});

// 將結果show在coonsole上
showCursorItems(cursor);
