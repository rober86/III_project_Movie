my $movieDir = "/Users/YuFeiPeng/III/PROJECT/Movie/Web/Django/III_project_movie_test2/movie_recommand/static/Posters/";
my $client = MongoDB::MongoClient->new(host => 'localhost', 
                                       port => 27017);
my $database = $client->get_database( 'final' );
my $grid = $database->get_gridfs;
my @vidFiles = getFiles($movieDir);

$grid->drop();
foreach my $file (@vidFiles) {
    my $fh = IO::File->new("$movieDir/$file", "r");
    $grid->insert($fh, {"filename" => $file,
    "content-type" => "video/quicktime", 
    "author" => "deb"});
}