// 要使用的db
db = connect("10.120.28.17:27018/truemovie");

// 當.js跑完後，將結果顯示在console shell的function
var showCursorItems = function(cursor){
	while (cursor.hasNext()) {
   		printjson(cursor.next());
	}
}

// 用title_t去群組，並加總數目
/* cursor = db.truemovie_copy.aggregate([
				{"$group" : {
					"_id" : "$title_t", 
					"count" : {"$sum" :1}
				}}, 
				{"$match" :{
					"count" : {"$gt" : 1} // 只顯示數目大於1的
				}}
]);
showCursorItems(cursor); */

// 定義cusor，使用aggregate
cursor = db.truemovie_copy.aggregate([
    // each Object is an aggregation.
    {	
		// 先分群，用_id去分群
        $group: { 
            originalId: {$first: '$_id'}, // Hold onto original ID. // 使用第一筆_id當作id
            _id: '$title_t', // Set the unique identifier //使用title_t當成分類的依據
            url:  {$first: '$url'}, // 使用第一筆的url當作url
            title_e: {$first: '$title_e '}, // 使用第一筆的title_e當作title_e
            type:  {$first: '$type'} // 使用第一筆的type當作type
        }

    }, {
        // this receives the output from the first aggregation.
        // So the (originally) non-unique 'id' field is now
        // present as the _id field. We want to rename it.
		
		// project 可以傳遞document，並指定特定欄位
        $project:{
            _id : '$originalId', // Restore original ID. // 用上面group的id當新的ocument的id

            title_t  : '$_id', // title_t是用來group的欄位
            url : '$url', // url是group裡的url，以下皆是
            title_e: '$title_e',
            type : '$type'
        }
    }
]);

// cursor 使用forEach給function，對每個cursor做動作
cursor.forEach(function(d){
		db.truemovie_removeOne.insert(d) // 把每個cursor放進truemovie_removeOne
});

// 將結果show在coonsole上
showCursorItems(cursor);

