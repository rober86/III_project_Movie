// 要使用的db
db = connect("10.120.28.17:27018/atmovie");

// 當.js跑完後，將結果顯示在console shell的function
var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

// 找長、短簡介空值
cursor_1 = db.atmovieFilm_Test.find({
					"intro_l" : "劇情簡介\r\n\t\t\t\r\n             \t\t  本片尚無介紹資料 ◎＿◎", // 長簡介的空值格式
					"intro_s" : " " // 短簡介的空值格式 
					
});

// cursor 使用forEach給function，對每個cursor做動作
cursor_1.forEach(function(d){
		db.atmovieFilm_null.insert(d) // 把每個cursor放進atmovieFilm_null
});

// cursor 使用forEach給function，對每個cursor做動作
cursor_1.forEach(function(d){
		db.atmovieFilm_Test.remove(d) // 把在atmovieFilm_Test每個cursor刪除
});

// 找導演、演員簡介空值
cursor_2 = db.atmovieFilm_Test.find({
					"director" : { "$in" : [ "null" , [] ]}, // 導演的空值，可能有兩種
					"actor" : { "$in" : [ "null", []]}	// 演員的空值，可能有兩種
});

// cursor 使用forEach給function，對每個cursor做動作
cursor_2.forEach(function(d){
		db.atmovieFilm_null.insert(d) // 把每個cursor放進atmovieFilm_null
});

// cursor 使用forEach給function，對每個cursor做動作
cursor_2.forEach(function(d){
		db.atmovieFilm_Test.remove(d) // 把在atmovieFilm_Test每個cursor刪除
});

// 將結果show在coonsole上
showCursorItems(cursor_1);
showCursorItems(cursor_2);
