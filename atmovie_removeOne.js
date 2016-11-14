// 要使用的db
db = connect("10.120.28.17:27018/atmovie");

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
cursor = db.atmovie.aggregate([
    // each Object is an aggregation.
    {	
		// 先分群，用_id去分群
        $group: { 
            originalId: {$first: '$_id'}, // Hold onto original ID. // 使用第一筆_id當作id
            _id: '$atmovie_id', // Set the unique identifier //atmovie_id           
            title_e: {$first: '$title_e '}, // 使用第一筆的title_e當作title_e
            type:  {$first: '$type'}, // 使用第一筆的type當作type
			rating : {$first: '$rating'},
			title_c : {$first: '$title_c'},
			imdb : {$first: '$imdb'},
			year : {$first: '$year'},
			title_t : {$first: '$title_t'},
			issuer : {$first: '$issuer'},
			truemovie_url : {$first: '$truemovie_url'},
			'area' : {$first: '$area'},
			writer : {$first: '$writer'},
			actor : {$first: '$actor'},			
			picture : {$first: '$picture'},
			poster : {$first: '$poster'},
			update : {$first: '$update'},
			director : {$first: '$director'},
			news : {$first: '$news'},
			box : {$first: '$box'},
			publisher : {$first: '$publisher'},
			intro_s : {$first: '$intro_s'},
			language : {$first: '$language'},
			release_date : {$first: '$release_date'},
			official : {$first: '$official'},
			youtube : {$first: '$youtube'},
			runtime : {$first: '$runtime'},
			intro_l : {$first: '$intro_l'}
			
        }

    }, {
        // this receives the output from the first aggregation.
        // So the (originally) non-unique 'id' field is now
        // present as the _id field. We want to rename it.
		
		// project 可以傳遞document，並指定特定欄位
        $project:{
            _id : '$originalId', // Restore original ID. // 用上面group的id當新的ocument的id
            atmovie_id  : '$_id', // atmovie_id是用來group的欄位           
            title_e: '$title_e',
            type : '$type',
			rating : '$rating',
			title_c : '$title_c',
			imdb : '$imdb',
			year : '$year',
			title_t : '$title_t',
			issuer : '$issuer',
			truemovie_url : '$truemovie_url',
			'area' : '$area',
			writer : '$writer',
			actor : '$actor',			
			picture : '$picture',
			poster : '$poster',
			update : '$update',
			director : '$director',
			news : '$news',
			box : '$box',
			publisher : '$publisher',
			intro_s : '$intro_s',
			language : '$language',
			release_date : '$release_date',
			official : '$official',
			youtube : '$youtube',
			runtime : '$runtime',
			intro_l : '$intro_l'		
        }
    }
]);

// cursor 使用forEach給function，對每個cursor做動作
cursor.forEach(function(d){
		db.atmovie_removeOne.insert(d) // 把每個cursor放進atmovie_removeOne
});

// 將結果show在coonsole上
showCursorItems(cursor);

