

var song_data = [["JTracks","Aimer","Blanc","Kataomoi","03:27"],["JTracks","Aimer","Singles","Ref rain","04:50"],["Indonesia","Basgilano","Singles","Anjing Kacili","06:02"],["Classical","Beethoven","Singles","Moonlight Sonata","05:17"],["Classical","Beethoven","Singles","Pathetique","19:25"],["KPop","BTS","Love Yourself","Singularity","03:15"],["KPop","BTS","Love Yourself","Airplane pt.2","03:38"],["Pop","Coldplay","A Head Full of Dream","Adventure of A Lifetime","03:43"],["Pop","Coldplay","A Head Full of Dream","Hymn for the Weekend","04:18"],["Indonesia","Fourtwnty","Lelaku","Fana Merah Jambu","05:58"],["Indonesia","Fourtwnty","Lelaku","Zona Nyaman","04:19"],["KPop","GFRIEND","Flower Bud","Me Gustas Tu","03:40"],["KPop","GFRIEND","Parallel","Love Whisper","03:31"],["KPop","GFRIEND","Singles","Love Rain","03:29"],["Party","KSHMR","Sunburn Goa Anthem","Bazaar","02:48"],["Party","KSHMR","The Lion Across The Field","Wildcard","03:24"],["JTracks","Linked Horizon","Singles","Jiyuu no Tsubasa","05:28"],["JTracks","Linked Horizon","Singles","Sasageyo!","05:41"],["JTracks","LiSA","Best Day","Shirushi","04:47"],["JTracks","LiSA","Best Way","Catch the Moment","04:41"],["Pop","Maroon 5","V","Sugar","05:01"],["Party","Martin Garrix","Singles","Animals","01:00"],["Party","Martin Garrix","Singles","Helicopter","04:37"],["Classical","Mozart","Singles","Rondo Alla Turca","03:33"],["Classical","Mozart","Singles","Symphony No 40","04:08"],["Party","Oliver Heldens","Singles","Bunny Dance","03:24"],["Party","Oliver Heldens","Singles","Melody","04:49"],["Indonesia","Samsons","Naluri Lelaki","Kenangan Terindah","04:08"],["Indonesia","Samsons","Penantian Hidup","Luluh","04:41"],["Pop","The Chainsmokers","Singles","Closer","04:04"],["Pop","The Chainsmokers","Singles","Dont Let Me Down","03:29"],["KPop","Twice","Merry & Happy","Heartshaker","03:12"],["KPop","Twice","Singles","Candy Pop","03:16"],["KPop","WJSN","From WJSN","I Wish","03:38"],["KPop","WJSN","The Secret","Secret","03:42"]]

var genres = ["Pop","KPop","JTracks","Party","Classical","Indonesia"]
var recent_search= [["song","Candy Pop"],["album","Singles"]];
var search_query = "";
var begin = true;
audio= new Audio();
var song_queue = song_data;
var first_time = true;
var onShuffle = false;

var result_genre = "";
var result_artist = "";
var result_album = "";
var songs = [];
var result_song = [];
var backup_queue = [];

var selected_user = 0;
var user_data = [["Cheesie",[["KPop","WJSN","From WJSN","I Wish","01:00"],["KPop","WJSN","The Secret","Secret","01:00"]]]];



var mainContainer = document.querySelector("#mainContainer");
sb = document.querySelector("#searchBar");
var modalSong = document.querySelector("#popupModalSong");
var modalGenre = document.querySelector("#popupModalGenre");
var btnAddGenre = document.querySelector("#addGenreButton");
var btnAddSong = document.querySelector("#addGenreButton"); 


function fixParalax()
{
    
    // var menuwidth = document.querySelector("#navbar").clientWidth;
    // var prlx = document.querySelector("#banner");
    // console.log("auto "+(100-menuwidth).toString()+"%");
    // prlx.style.backgroundSize = "auto"+(100-menuwidth).toString()+"%";
    // var imgsrc = prlx.style.backgroundSize.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0]
    // var image = new Image();
    // image.src = imgsrc;

    // var mainwidth = document.querySelector("#mainContainer").clientWidth;
    // var mainHeight = document.querySelector("#mainContainer").clientHeight;
    // var prlx = document.querySelector("#banner");
    // console.log("auto "+mainwidth/2.5204+"px");
    // prlx.style.backgroundSize = "auto "+mainwidth/2.5204+"px";
   
}

function getAllSongGenre(genre)
{
    var songs = [];
    var length = 0;
    song_data.forEach(function(elem){
        if(elem[0].toLowerCase() === genre.toLowerCase())
        {
            length=songs.push(elem);
        }
    })
    backup_queue = songs;
    var data = [genre,songs,length];
    return data;
}

function getAllSongAlbum(album)
{
    var songs = [];
    var length = 0;
    song_data.forEach(function(elem){
        if(elem[2].toLowerCase()===album.toLowerCase())
        {
            length = songs.push(elem);
        }
    })
    backup_queue = songs;
    var data = [album,songs,length];
    return data;
}

function getAllSongArtist(artist)
{
    var songs = []
    var albums = []
    song_data.forEach(function(elem){
        if(elem[1].toLowerCase() === artist.toLowerCase())
        {
            songs.push(elem);
            if(albums.indexOf(elem[2]) <0)
            {
                albums.push(elem[2]);
            }
        }
    })
    backup_queue = songs;
    var data=[artist,songs,albums];
    return data;
}

function gotoGenre(name)
{
    mainContainer = document.querySelector("#mainContainer");
    console.log("Genre : "+name);
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-genre");
    init(name);

    
}

function gotoLibrary()
{
    mainContainer = document.querySelector("#mainContainer");
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-library");
    init("empty");
}

function gotoAlbum(name)
{
    mainContainer = document.querySelector("#mainContainer");
    console.log("Album : "+name)
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-album")
    init(name);


}

function gotoSong(param)
{
    btnRepeat = document.querySelector("#control-repeat");
    btnPlay.src="assets/icons/pause.png";
    mainContainer = document.querySelector("#mainContainer");
    console.log("song : "+param);
    playlist_index = 0;
    song_queue = [];
    song_data.forEach(function(elem){
        if(elem[3].toLowerCase()===param.toLowerCase())
        {
            console.log("masukkk");
            if(song_queue.indexOf(elem) <0)
            {
                song_queue.push(elem);
            }
            
        }
    })
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
}

function gotoArtist(name)
{
    mainContainer = document.querySelector("#mainContainer");
    console.log("Artist : "+name);
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-artist")
    init(name);
}

function gotoSetting()
{
    mainContainer = document.querySelector("#mainContainer");
    document.getElementsByTagName("BODY")[0].style.backgroundImage = "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#000000), to(#212121)";
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-setting");
    init("empty");
}

function backtoHome()
{
    mainContainer = document.querySelector("#mainContainer");
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-landing");
    init("empty");
}

function initChange()
{
    if(sb.value !== "")
    {
        document.querySelector("#recent").style.display = "none";
        result_genre = "";
        result_artist = "";
        result_album = "";
        songs = [];
        result_song = [];
        console.log(sb.value);
        genres.forEach(function(elem){
            if( elem.toLowerCase().indexOf(sb.value.toLowerCase()) !== -1)
            {
                result_genre = elem;
                
            }
        })
        lcontainer = document.querySelector("#leftContainer");
        scontainer = document.querySelector("#songContainer");
        document.querySelector("#leftContainer").style.display="inline-block";
        document.querySelector("#songContainer").style.display="inline-block";
        document.querySelector("#errormsg").style.display="none";
        //scontainer.innerHTML = "";
        if(result_genre !== "" && sb.value !=="")
        {
            if(recent_search.length ===3)
            {
                recent_search.unshift(["Genre",sb.value.toString()]);
                recent_search.pop();
            }
            else
            {
                recent_search.ushift(["Genre",sb.value.toString()]);
            }

            console.log("Result Genre : "+result_genre);
            songs = getAllSongGenre(result_genre);
            lcontainer.innerHTML = '<img class="album-big" src="assets/genres/genre-'+result_genre+'.jpg" alt="" style="margin-top: 15px;"><div id="albumTitle"><h1>'+result_genre+'</h1></div><div id="albumSongs">'+songs[2]+'</div><button id="playButton" onclick="addQueue(\''+result_genre+'\')">Play</button>';
            scontainer.innerHTML = "";
            songs[1].forEach(function(elem){
                
                scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
            })
            animateSongList();
        }
        else
        {
            song_data.forEach(function(elem){
                if( elem[1].toLowerCase().indexOf(sb.value.toString().toLowerCase()) !== -1)
                {
                    result_artist = elem[1];
                }
            })

            if(result_artist !== "" && sb.value !=="")
            {
                if(recent_search.length ===3)
                {
                    recent_search.unshift(["Artist",sb.value.toString()]);
                    recent_search.pop();
                }
                else
                {
                    recent_search.unshift(["Artist",sb.value.toString()]);
                }
                console.log("Result Artist : "+result_artist);
                songs = getAllSongArtist(result_artist);
                lcontainer.innerHTML = '<img class="album-big" src="assets/banners/banner-'+result_artist+'.jpg" alt="" style="margin-top: 15px; cursor:pointer;" onclick="gotoArtist(\''+result_artist+'\')"><div id="albumTitle" style="cursor:pointer;" onclick="gotoArtist(\''+result_artist+'\')"><h1>'+result_artist+'</h1></div><div id="albumSongs">'+songs[2]+'</div><button id="playButton" onclick="addQueueArtist(\''+result_artist+'\')">Play</button>';
                console.log(songs);
                scontainer.innerHTML = "";
                songs[1].forEach(function(elem){
                    console.log("elems");
                    console.log(elem);
                    scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
                })
                animateSongList();

            }
            else
            {
                song_data.forEach(function(elem){
                    if(  elem[2].toLowerCase().indexOf(sb.value.toLowerCase()) !==-1)
                    {
                        result_album = elem[2];
                    }
                })

                if(result_album !== "" && sb.value !=="")
                {
                    if(recent_search.length ===3)
                    {
                        recent_search.unshift(["Album",sb.value.toString()]);
                        recent_search.pop();
                    }
                    else
                    {
                        recent_search.unshift(["Album",sb.value.toString()]);
                    }
                    console.log("Result Album : "+result_album);
                    songs = getAllSongAlbum(result_album);
                    lcontainer.innerHTML = '<img class="album-big" src="assets/albums/album-'+result_album+'.jpg" alt="" style="margin-top: 15px; cursor:pointer;" onclick="gotoAlbum(\''+result_album+'\')"><div id="albumTitle" style="cursor:pointer;" onclick="gotoAlbum(\''+result_album+'\')"><h1>'+result_album+'</h1></div><div id="albumSongs">'+songs[2]+'</div><button id="playButton" onclick="addQueueAlbum(\''+result_album+'\')">Play</button>';
                    scontainer.innerHTML = "";
                    songs[1].forEach(function(elem){
                        scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
                    })
                    animateSongList();
                }
                else
                {
                    var length = 0;
                    song_data.forEach(function(elem){
                        if(elem[3].toLowerCase().indexOf(sb.value.toLowerCase()) !== -1)
                        {
                            if(result_song.indexOf(elem) <0)
                            {
                                length = result_song.push(elem);
                            }
                            
                        }
                    })
                    if(length > 0 && sb.value !=="")
                    {
                        if(recent_search.length ===3)
                        {
                            recent_search.unshift(["Song",sb.value.toString()]);
                            recent_search.pop();
                        }
                        else
                        {
                            recent_search.unshift(["Song",sb.value.toString()]);
                        }
                        
                        lcontainer.innerHTML = '</div><button id="playButton" onclick="addQueueSong(\''+sb.value.toLowerCase()+'\')">Play</button>';
                        scontainer.innerHTML = "";
                        result_song.forEach(function(elem){
                            scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
                        })
                        animateSongList();
                    }
                    else
                    {
                        if(sb.value !=="")
                        {
                            document.querySelector("#leftContainer").style.display="none";
                            document.querySelector("#songContainer").style.display="none";
                            document.querySelector("#errormsg").style.display="block";
    
                            document.querySelector("#errormsg").innerHTML = "No Result Match Your Query";
                        }
                        
                        
                    }
                    
                }
            }
        }
    }
}

function initInput()
{
    if(sb.value === "" && recent_search !=[])
    {
        document.querySelector("#leftContainer").style.display="none";
        document.querySelector("#songContainer").style.display="none";
        document.querySelector("#errormsg").style.display="none";
        rcnt = document.querySelector("#recent");
        rcnt.style.display = "block";
        rcnt.innerHTML = "<p>RECENT SEARCHES</p>";
        recent_search.forEach(function(elem){  
            rcnt.innerHTML +='<div class="recent-items"><div class="recent-title" onclick="recentSearch(\''+elem[0]+"#"+elem[1]+'\')">'+elem[1]+'</div><div class="recent-type">'+elem[0]+'</div></div>';
        })

    }
}

function gotoSearch()
{
    mainContainer = document.querySelector("#mainContainer");
    document.getElementsByTagName("BODY")[0].style.backgroundImage = "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#000000), to(#212121)";
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-search");
    search_query = "";
    
    
    if(recent_search !== [])
    {
        mainContainer.innerHTML= '<div id="topContainer"><div id="search"><div id="notice">Search for Song or Artist</div><input id="searchBar" type="text" name="" id=""></div></div><div id="recent"><p>RECENT SEARCHES</p></div><div id="leftContainer"></div><div id="songContainer" style="margin-top: 15px; min-width: 50%;"></div><div id="errormsg"></div></div>';
        rcnt = document.querySelector("#recent");
        recent_search.forEach(function(elem){  
            rcnt.innerHTML +='<div class="recent-items"><div class="recent-title" onclick="recentSearch(\''+elem[0]+"#"+elem[1]+'\')">'+elem[1]+'</div><div class="recent-type">'+elem[0]+'</div></div>';
        })
    }
    else
    {
        mainContainer.innerHTML = '<div id="topContainer"><div id="search"><div id="notice">Search for Song or Artist</div><input id="searchBar" type="text" name="" id=""></div></div><div id="recent"></div><div id="leftContainer"></div><div id="songContainer" style="margin-top: 15px; min-width: 50%;"></div><div id="errormsg"></div></div>';
    }

    sb = document.querySelector("#searchBar");
    sb.addEventListener("input",initInput);
    sb.addEventListener("change",initChange);
    console.log(initChange);
    
}

function recentSearch(param)
{
    

    console.log("recent");
    var data = param.split("#");
    var type = data[0];
    var title = data[1];
    var songs = []
    sb.value =title;
    result_genre = "";
    result_artist = "";
    result_album = "";
    songs = [];
    result_song = [];
    if(recent_search !== [])
    {
        mainContainer.innerHTML= '<div id="topContainer"><div id="search"><div id="notice">Search for Song or Artist</div><input id="searchBar" type="text" name="" id="" value="'+title+'"></div></div><div id="recent"><p>RECENT SEARCHES</p></div><div id="leftContainer"></div><div id="songContainer" style="margin-top: 15px; min-width: 50%;"></div><div id="errormsg"></div></div>';
        rcnt = document.querySelector("#recent");
        recent_search.forEach(function(elem){  
            rcnt.innerHTML +='<div class="recent-items"><div class="recent-title" onclick="recentSearch(\''+elem[0]+"#"+elem[1]+'\')">'+elem[1]+'</div><div class="recent-type">'+elem[0]+'</div></div>';
        })
    }
    else
    {
        mainContainer.innerHTML = '<div id="topContainer"><div id="search"><div id="notice">Search for Song or Artist</div><input id="searchBar" type="text" name="" id="" value="'+title+'></div></div><div id="recent"></div><div id="leftContainer"></div><div id="songContainer" style="margin-top: 15px; min-width: 50%;"></div><div id="errormsg"></div></div>';
    }

    sb = document.querySelector("#searchBar");
    sb.addEventListener("change", initChange);
    sb.addEventListener("input", initInput);



    var lcontainer = document.querySelector("#leftContainer");
    var scontainer = document.querySelector("#songContainer");
    document.querySelector("#recent").style.display = "none";

    if(type.toLowerCase()==="genre")
    {
        genres.forEach(function(elem){
            if( elem.toLowerCase().indexOf(title.toLowerCase()) !== -1)
            {
                result_genre = elem;
                
            }
        })
        console.log("Result Genre : "+result_genre);
        songs = getAllSongGenre(result_genre);
        lcontainer.innerHTML = '<img class="album-big" src="assets/genres/genre-'+result_genre+'.jpg" alt="" style="margin-top: 15px;"><div id="albumTitle"><h1>'+result_genre+'</h1></div><div id="albumSongs">'+songs[2]+'</div><button id="playButton" onclick="addQueue(\''+result_genre+'\')">Play</button>';
        songs[1].forEach(function(elem){
            
            scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
        })
        animateSongList();
    }
    else if(type.toLowerCase() === "song")
    {
        song_data.forEach(function(elem){
            if(elem[3].toLowerCase().indexOf(sb.value.toLowerCase()) !== -1)
            {
                if(result_song.indexOf(elem) <0)
                {
                    length = result_song.push(elem);
                }
                
            }
        })
        lcontainer.innerHTML = '</div><button id="playButton" onclick="addQueueSong(\''+sb.value.toLowerCase()+'\')">Play</button>';
        result_song.forEach(function(elem){
            scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
        })
        animateSongList();
        
    }
    else if(type.toLowerCase() === "artist")
    {
        song_data.forEach(function(elem){
            if( elem[1].toLowerCase().indexOf(title.toString().toLowerCase()) !== -1)
            {
                result_artist = elem[1];
            }
        })
        console.log("Result Artist : "+result_artist);
        songs = getAllSongArtist(result_artist);
        lcontainer.innerHTML = '<img class="album-big" src="assets/banners/banner-'+result_artist+'.jpg" alt="" style="margin-top: 15px;"><div id="albumTitle"><h1>'+result_artist+'</h1></div><div id="albumSongs">'+songs[2]+'</div><button id="playButton" onclick="addQueueArtist(\''+result_artist+'\')">Play</button>';
        console.log(songs);
        songs[1].forEach(function(elem){
            console.log("elems");
            console.log(elem);
            scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
        })
        animateSongList();
    }
    else if(type.toLowerCase() === "album")
    {
        console.log("tetew");
        song_data.forEach(function(elem){
            if(  elem[2].toLowerCase().indexOf(sb.value.toLowerCase()) !==-1)
            {
                result_album = elem[2];
            }
        })
        console.log("Result Album : "+result_album);
        songs = getAllSongAlbum(result_album);
        lcontainer.innerHTML = '<img class="album-big" src="assets/albums/album-'+result_album+'.jpg" alt="" style="margin-top: 15px;"><div id="albumTitle"><h1>'+result_album+'</h1></div><div id="albumSongs">'+songs[2]+'</div><button id="playButton" onclick="addQueueAlbum(\''+result_album+'\')">Play</button>';
        songs[1].forEach(function(elem){
            scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
        })
        animateSongList();
    }
    sb = document.querySelector("#searchBar");
    sb.addEventListener("input",function(elem){
        if(sb.value === "" && recent_search !=[])
        {
            document.querySelector("#leftContainer").style.display="none";
            document.querySelector("#songContainer").style.display="none";
            document.querySelector("#errormsg").style.display="none";
            rcnt = document.querySelector("#recent");
            rcnt.style.display = "block";
            rcnt.innerHTML = "<p>RECENT SEARCHES</p>";
            recent_search.forEach(function(elem){  
                rcnt.innerHTML +='<div class="recent-items"><div class="recent-title" onclick="recentSearch(\''+elem[0]+"#"+elem[1]+'\')">'+elem[1]+'</div><div class="recent-type">'+elem[0]+'</div></div>';
            })

        }
    });

}

function fisherYates()
{
    console.log("do fisher yates");
    backup_queue = song_queue.slice();
    var currentIndex = song_queue.length,temp,rand;
    while(currentIndex !=0)
    {
        rand = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temp = song_queue[currentIndex];
        song_queue[currentIndex] = song_queue[rand];
        song_queue[rand] = temp;
    }
    btnShuffle.src = "assets/icons/shuffle-active.png";
    onShuffle = true;
}

function addQueueSong(param)
{
    btnRepeat = document.querySelector("#control-repeat");
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    song_queue = [];
    song_data.forEach(function(elem){
        if(elem[3].toLowerCase().indexOf(param) !== -1)
        {
            if(song_queue.indexOf(elem) <0)
            {
                song_queue.push(elem);
            }
            
        }
    })

    if(onShuffle)
    {
        fisherYates();
    }
    
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
}

function addQueue(param)
{
    btnRepeat = document.querySelector("#control-repeat");
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var songs =  getAllSongGenre(param);
    song_queue=[]
    songs[1].forEach(function(elem){
        song_queue.push(elem);
    })
    if(onShuffle)
    {
        fisherYates();
    }
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
    //initAudioPlayer();

}

function addQueueAlbum(param)
{
    btnRepeat = document.querySelector("#control-repeat");
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var songs = getAllSongAlbum(param);
    song_queue=[]
    songs[1].forEach(function(elem){
        song_queue.push(elem);
    })
    if(onShuffle)
    {
        fisherYates();
    }
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
}

function addQueueArtist(param)
{
    btnRepeat = document.querySelector("#control-repeat");
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var songs = getAllSongArtist(param);
    song_queue=[]
    songs[1].forEach(function(elem){
        song_queue.push(elem);
    })
    if(onShuffle)
    {
        fisherYates();
    }
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
}

function openGenreModal()
{
    modalGenre.style.display = "block";
}
function openSongModal()
{
    modalSong.style.display = "block";
}

function closeModal()
{
    modalGenre.style.display = "none";
    modalSong.style.display = "none";
}

function removeSong(name)
{
    var selectedelem = [];
    var idx = 0;
    var selectedidx = 0;
    song_data.forEach(function(elem){
        if(name.toLowerCase() === elem[3].toLowerCase())
        {
            selectedidx = idx;
            selectedelem = elem;
            

        
        }
        idx++;
    })
    user_data[selected_user][1].splice(user_data[selected_user][1].indexOf(selectedelem),1);
    var con = document.querySelector("#context");
    con.style.display="none";
    if(mainContainer.classList.contains("t-library"))
    {
        init("empty")
    }
}

function addSong(name)
{
    var selectedelem = [];
    var idx = 0;
    var selectedidx = 0;
    song_data.forEach(function(elem){
        if(name.toLowerCase() === elem[3].toLowerCase())
        {
            selectedidx = idx;
            selectedelem = elem;
            

        
        }
        idx++;
    })
    user_data[selected_user][1].push(selectedelem);
    var con = document.querySelector("#context");
    con.style.display="none";
    
}

function showContext(name)
{
    var con = document.querySelector("#context");
    console.log(con);
    con.style.display="block";
    con.style.position="absolute";
    con.style.zIndex=20;

    con.style.left = event.pageX + "px";
    con.style.top = event.pageY + "px";
    var fflag = false;
    var selectedelem = [];
    user_data[selected_user][1].forEach(function(elem){
        if(name.toLowerCase() === elem[3].toLowerCase())
        {
            fflag = true;
            con.innerHTML='<p  onclick="removeSong(\''+name+'\')">Remove song from library</p>';
            selectedelem = elem;
        }
    })
    if(fflag === false)
    {
        con.innerHTML='<p onclick="addSong(\''+name+'\')">Add song from library</p>';
        
    }
   
}



function submitSong()
{
    var genre = document.querySelector("#albumTitle").querySelectorAll("h1")[0].innerHTML;

    var inputName = document.querySelector("#input-song-name");
    var inputNameError = document.querySelector("#input-song-name-error");
    var inputDuration = document.querySelector("#input-song-duration");
    var inputDurationError = document.querySelector("#input-song-duration-error");
    var inputArtist = document.querySelector("#input-song-artist");
    var inputArtistError = document.querySelector("#input-song-artist-error");
    var inputAlbum = document.querySelector("#input-song-album");
    var inputAlbumError = document.querySelector("#input-song-album-error");
    var inputCheck = document.querySelector("#input-song-check");
    var inputCheckError = document.querySelector("#input-song-check-error");
    inputNameError.style.display = "none";
    inputDurationError.style.display = "none";
    inputArtistError.style.display = "none";
    inputAlbumError.style.display = "none";
    inputCheckError.style.display  = "none";
    var flag = false;
    if(inputName.value === "")
    {
        inputNameError.style.display = "block";
        inputNameError.innerHTML = "Song name must be filled";
        flag = true;
    }
    if(inputDuration.value === "")
    {
        inputDurationError.style.display = "block";
        inputDurationError.innerHTML = "Duration name must be filled";
        flag = true;
    }
    if(inputArtist.value === "")
    {
        inputArtistError.style.display = "block";
        inputArtistError.innerHTML = "Artist name must be filled";
        flag = true;
    }
    if(inputAlbum.value === "")
    {
        inputAlbumError.style.display = "block";
        inputAlbumError.innerHTML = "Album name must be filled";
        flag = true;
    }
    if(inputCheck.checked === false)
    {
        inputCheckError.style.display = "block";
        inputCheckError.innerHTML = "Please check the checkbox above to cotinue";
        flag = true;
    }

    if(flag === false)
    {
        var newData = [];
        newData.push(genre);
        newData.push(inputArtist.value);
        newData.push(inputAlbum.value);
        newData.push(inputName.value);
        newData.push(inputDuration.value);
        song_data.push(newData);
        modalGenre.style.display = "none";
        modalSong.style.display = "none";
        inputName.value = "";
        inputDuration.value = "";
        inputArtist.value = "";
        inputAlbum.value = "";
        inputCheck.checked = false;
        init(genre);
    }
    

}

function submitGenre()
{
    var inputName = document.querySelector("#input-genre-name");
    var inputNameError = document.querySelector("#input-genre-name-error");
    var inputCheck = document.querySelector("#input-genre-check");
    var inputCheckError = document.querySelector("#input-genre-check-error");
    inputCheckError.style.display = "none";
    inputNameError.style.display = "none";
    console.log(inputName.value);

    var flag = false;
    if(inputName.value === "")
    {
        inputNameError.style.display = "block";
        inputNameError.innerHTML = "Genre name must be filled";
        flag = true;
    }
    if(inputCheck.checked === false)
    {
        inputCheckError.style.display = "block";
        inputCheckError.innerHTML = "Please check the checkbox above to cotinue";
        flag = true;
    }

    if(flag===false)
    {   
        genres.push(inputName.value);
        modalGenre.style.display = "none";
        modalSong.style.display = "none";
        inputCheck.checked = false;
        inputName.value = "";
        init("empty");
    }

}

function getUserSong()
{
    var songs = [];
    var length = 0;
    user_data[selected_user][1].forEach(function(elem){
        length = songs.push(elem);
    });
    return [songs,length];
}

function playUserSong()
{
    btnRepeat = document.querySelector("#control-repeat");
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var songs = getUserSong();
    song_queue=[]
    songs[0].forEach(function(elem){
        song_queue.push(elem);
    })
    if(onShuffle)
    {
        fisherYates();
    }
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
    
}

function animateGenreList()
{
    var animate = document.getElementsByClassName("card");
    var anim = 1;
    Array.prototype.forEach.call(animate,function(elem){
    elem.style.webkitAnimation = "floatup "+anim+"s ease-in";
    anim += 0.1;
    
    })
}

function animateSongList()
{
    var animate = document.getElementsByClassName("songCard");
    var anim = 0;
    Array.prototype.forEach.call(animate,function(elem){
    elem.style.webkitAnimation = "floatleft "+anim+"s ease-in";
    anim += 0.5;
    
    })
}

function init(param)
{
    btnPlay = document.querySelector("#control-play");
    seekSlider= document.querySelector("#progressBar");
    volumeSlider = document.querySelector("#progressBarVolume");
    currentTime = document.querySelector("#current");
    durationTime = document.querySelector("#remaining");
    currentTitle = document.querySelector("#now-title");
    currentArtist = document.querySelector("#now-artist");
    currentThumb = document.querySelector("#now-thumb");
    prevSong = document.querySelector("#control-previous");
    nextSong = document.querySelector("#control-next");
    progressSong = document.querySelector("#progress-song");
    progressVolume = document.querySelector("#progress-volume");
    seekInput = document.querySelector("#input-seeker");
    volumeInput = document.querySelector("#input-volume");
    btnRepeat = document.querySelector("#control-repeat");
    btnShuffle = document.querySelector("#control-shuffle");


    mainContainer = document.querySelector("#mainContainer");
    document.querySelector("#searchBar");
    modalSong = document.querySelector("#popupModalSong");
    modalGenre = document.querySelector("#popupModalGenre");
    btnAddGenre = document.querySelector("#addGenreButton");
    btnAddSong = document.querySelector("#addGenreButton"); 

    if(!document.getElementsByTagName("BODY")[0].classList.contains("body-index"))
    {
        window.addEventListener("resize",fixParalax,true);
        window.onclick = function(event){
            if(event.target == modalGenre || event.target == modalSong)
            {
                modalGenre.style.display = "none";
                modalSong.style.display = "none";
            }
            if(event.target !=  document.querySelector("#context") )
            {
                if(document.querySelector("#context"))
                {
                    document.querySelector("#context").style.display = "none";
                }
                
            }
        }
        
        var randColor='#'+(Math.random()*0xFFFFFF<<0).toString(16);
        console.log(randColor);
        document.getElementsByTagName("BODY")[0].style.backgroundImage = "-webkit-gradient(linear, 0% 0%, 0% 100%, from("+randColor+"), to(#212121), color-stop(.6,#333333))";
        if(mainContainer.classList.contains("t-landing"))
        {
            
            
            mainContainer.innerHTML = '<div id="title"><h1>Genres & Moods</h1><button id="addGenreButton" onclick="openGenreModal()">Add New Genre</button></div><div id="cardContainer"></div>';
            btnAddGenre = document.querySelector("#addGenreButton");
            var cardContainer = document.querySelector("#cardContainer");
            genres.forEach(function(elem){
                cardContainer.innerHTML +="<div class='card' onclick='gotoGenre(\""+elem+"\")'><div class='thumbnail'><img src='assets/genres/genre-"+elem+".jpg' alt='' class='img-thumb'></div><div class='description'><p>"+elem+"</p></div></div>";
            })
            animateGenreList();

           
        }
        else if(mainContainer.classList.contains("t-genre"))
        {
           var songs =  getAllSongGenre(param);
           mainContainer.innerHTML='<div id="albumContainer"><img class="album-big" src="assets/genres/genre-'+songs[0]+'.jpg" alt=""><div id="albumTitle"><h1>'+songs[0]+'</h1></div><div id="albumSongs">'+songs[2]+' Songs'+'</div><button id="playButton" onclick="addQueue(\''+param+'\')">Play</button><button id="addSongButton" onclick="openSongModal()">Add New Song</button></div><div id="songContainer" style="margin-top: 0px;"></div></div>';
           btnAddSong = document.querySelector("#addSongButton");;
           var songContainer = document.querySelector("#songContainer");
           songs[1].forEach(function(elem){
                songContainer.innerHTML +='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\' );return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';
           })
           animateSongList();
           


        }
        else if(mainContainer.classList.contains("t-album"))
        {
            var songs = getAllSongAlbum(param);
            mainContainer.innerHTML='<div id="leftContainer"  style="text-align:center;" ><img class="album-big" src="assets/albums/album-'+songs[0]+'.jpg" alt="" style="margin-top: 35px;"><div id="albumTitle"><h1>'+songs[0]+'</h1></div><div id="albumSongs">'+songs[2]+' Songs'+'</div><button id="playButton" onclick="addQueueAlbum(\''+param+'\')">Play</button></div><div id="songContainer" style="margin-top: 35px; min-width: 50%;"></div>';
            var songContainer = document.querySelector("#songContainer");
            songs[1].forEach(function(elem){
                songContainer.innerHTML +='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';
            })
            animateSongList();
        }
        else if(mainContainer.classList.contains("t-artist"))
        {
            var songs = getAllSongArtist(param);
            mainContainer.innerHTML='<div id="banner"><div class="layer"><div id="artist-title">'+songs[0]+'</div><div class="options"><button id="playButton" style="width: 500px; display: inline-block; margin-right: 1em;" onclick="addQueueArtist(\''+param+'\')">Play</button></div></div></div><div id="content"><h3>Songs</h3><div id="songContainer" style="margin-top: 0px;"></div><div id="albumContainer"><h3>Albums</h3><div id="cardContainer"></div></div></div>';
            var banner = document.querySelector("#banner");
            var songList = document.querySelector("#songContainer");
            var albumList = document.querySelector("#cardContainer");
            console.log('url("assets/banners/banner-'+songs[0]+'.jpg")');
            banner.style.backgroundImage = 'url("assets/banners/banner-'+songs[0]+'.jpg")';
            songs[1].forEach(function(elem){
                songList.innerHTML += '<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\'">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';
            })
            songs[2].forEach(function(elem){
                albumList.innerHTML +='<div class="card" onclick="gotoAlbum(\''+elem+'\')"><div class="thumbnail"><img src="assets/Albums/album-'+elem+'.jpg" alt="" class="img-thumb"></div><div class="description"><p>'+elem+'</p></div></div>';
            })
            animateSongList();
            animateGenreList();
    
        }
        else if(mainContainer.classList.contains("t-library"))
        {
            var songs = getUserSong();
            mainContainer.innerHTML ='<div id="albumContainer"><div><h1 id="userName">Cheesie</h1></div><div id="albumSongs"><span id="totalSongs">30 songs</span></div><button id="playButton" onclick="playUserSong()">Play</button></div><div id="songContainer" style="margin-top: 0px;"></div>';
            //document.querySelector("#userName").innerHTML = user_data[selected_user][0];
            document.querySelector("#userName").innerHTML ="My Songs";
            
            document.querySelector("#totalSongs").innerHTML = songs[1] + " Songs";
            var songContainer = document.querySelector("#songContainer");
            songs[0].forEach(function(elem){
                songContainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';
            })
            animateSongList();
        }
    }
    
    

}

btnPlay = document.querySelector("#control-play");
seekSlider= document.querySelector("#progressBar");
volumeSlider = document.querySelector("#progressBarVolume");
currentTime = document.querySelector("#current");
durationTime = document.querySelector("#remaining");
currentTitle = document.querySelector("#now-title");
currentArtist = document.querySelector("#now-artist");
currentThumb = document.querySelector("#now-thumb");
prevSong = document.querySelector("#control-previous");
nextSong = document.querySelector("#control-next");
progressSong = document.querySelector("#progress-song");
progressVolume = document.querySelector("#progress-volume");
seekInput = document.querySelector("#input-seeker");
volumeInput = document.querySelector("#input-volume");
btnRepeat = document.querySelector("#control-repeat");
btnShuffle = document.querySelector("#control-shuffle");


function getOffset(elem) { 
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return Math.round(left);
}

function timeUpdate()
{
  
    var tm = audio.currentTime * (100/audio.duration);
    var tmperc = tm+"%";
    progressSong.style.width = ""+tmperc+"";
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var dursecs = 0;
    if(!Number.isNaN(audio.duration))
    {
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
    }
    else
    {
        durmins = 0;
    }
    if(cursecs < 10){ cursecs = "0"+cursecs; }
    if(dursecs < 10){ dursecs = "0"+dursecs; }
    if(curmins < 10){ curmins = "0"+curmins; }
    if(durmins < 10){ durmins = "0"+durmins; }
    currentTime.innerHTML = curmins+":"+cursecs;
    durationTime.innerHTML = durmins+":"+dursecs;

}
function switchSong()
{
    if(!onrepeat)
    {
        if(playlist_index == (song_queue.length-1) || playlist_index < 0){
            console.log("masuk");
            playlist_index = 0;
        } else {
            playlist_index++;	
        }
    }
    
    audio.src = "assets/songs/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
    currentTitle.innerHTML = song_queue[playlist_index][3];
    currentArtist.innerHTML = song_queue[playlist_index][1];
    currentThumb.src = "assets/albums/album-"+song_queue[playlist_index][2]+".jpg";
    if(song_queue.length !=1)
    {
        audio.play();
    }
    
}


function initSound(_callback)
{
    ext = ".mp3";
    agent = navigator.userAgent.toLowerCase();
    audio.src = "assets/songs/"+song_queue[0][1]+"-"+song_queue[0][2]+"-"+song_queue[0][3]+ext;
    audio.loop = false;
    audio.volume = 1;
    audio.play();
    currentTitle.innerHTML = song_queue[0][3];
    currentArtist.innerHTML = song_queue[0][1];
    currentThumb.src = "assets/albums/album-"+song_queue[0][2]+".jpg";
    audio.addEventListener("timeupdate",timeUpdate);
    audio.addEventListener("ended",switchSong);

    _callback && _callback();
}

function initAudioPlayer()
{
    btnPlay = document.querySelector("#control-play");
    seekSlider= document.querySelector("#progressBar");
    volumeSlider = document.querySelector("#progressBarVolume");
    currentTime = document.querySelector("#current");
    durationTime = document.querySelector("#remaining");
    currentTitle = document.querySelector("#now-title");
    currentArtist = document.querySelector("#now-artist");
    currentThumb = document.querySelector("#now-thumb");
    prevSong = document.querySelector("#control-previous");
    nextSong = document.querySelector("#control-next");
    progressSong = document.querySelector("#progress-song");
    progressVolume = document.querySelector("#progress-volume");
    seekInput = document.querySelector("#input-seeker");
    volumeInput = document.querySelector("#input-volume");
    btnRepeat = document.querySelector("#control-repeat");
    btnShuffle = document.querySelector("#control-shuffle");
    console.log(btnPlay);

    playlist_index = 0;
    //fn = filename.split("-");
    seeking = false,vseek = false,onrepeat = false;
    ext = ".mp3";
   
    
    agent = navigator.userAgent.toLowerCase();
    if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
        ext = ".ogg";
    }
    
    
    if(!first_time)
    {
        audio.src = "assets/songs/"+song_queue[0][1]+"-"+song_queue[0][2]+"-"+song_queue[0][3]+ext;
    audio.loop = false;
    audio.volume = 1;

        audio.play();
        currentTitle.innerHTML = song_queue[0][3];
        currentArtist.innerHTML = song_queue[0][1];
        currentThumb.src = "assets/albums/album-"+song_queue[0][2]+".jpg";
        
    }
    else
    {
        console.log("waw")
        first_time=true;
        song_queue = [];
    }
    
    if(begin)
    {
       
        btnPlay.addEventListener("click",playPause);
        seekInput.addEventListener("mousedown",function(event){
            seeking = true;
            seek(event);
        })
        seekInput.addEventListener("mouseup",function(){seeking = false})
        seekInput.addEventListener("mousemove",function(event){seek(event)});
        volumeInput.addEventListener("mousedown",function(event){vseek = true,setVolume(event) });
        volumeInput.addEventListener("mouseup",function(){vseek = false});
        volumeInput.addEventListener("mousemove",function(event){setVolume(event)});
        audio.addEventListener("timeupdate",timeUpdate);
        audio.addEventListener("ended",switchSong);
        prevSong.addEventListener("click",pSong);
        nextSong.addEventListener("click",nSong);
        btnShuffle.addEventListener("click",shufflesong);
        btnRepeat.addEventListener("click",repeatsong);

        function shufflesong()
        {
            if(!onShuffle)
            {
                backup_queue = song_queue.slice();
                var currentIndex = song_queue.length,temp,rand;
                while(currentIndex !=0)
                {
                    rand = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    temp = song_queue[currentIndex];
                    song_queue[currentIndex] = song_queue[rand];
                    song_queue[rand] = temp;
                }
                btnShuffle.src = "assets/icons/shuffle-active.png";
                onShuffle = true;

            }
            else{
                var currsong = song_queue[playlist_index];
                var a=0;
                var BreakException = {};
                try
                {
                    backup_queue.forEach(function(elem){
                        if(elem === currsong)
                        {
                            playlist_index = a;
                            console.log(playlist_index);
                            throw BreakException;
                        }
                        a++;
                    });
                }catch(e)
                {
                    if(e!== BreakException)throw e;
                }
                
                song_queue=backup_queue;
                btnShuffle.src = "assets/icons/shuffle.png";
                onShuffle=false;
            }
            
            
        }

        function repeatsong()
        {
            onrepeat = !onrepeat;
            if(onrepeat)
            {
                btnRepeat.src="assets/icons/repeat-active.png"
            }
            else
            {
                btnRepeat.src = "assets/icons/repeat.png";
            }
        }
        function playPause()
        {
            console.log("init playpause")
            if(audio.paused)
            {
                if(song_queue !== [])
                {
                    audio.play();
                    btnPlay.src="assets/icons/pause.png";
                }
                
            }
            else
            {
                if(song_queue !== [])
                {
                    audio.pause();
                    btnPlay.src="assets/icons/play.png"
                }
                
            }
        }

                
        function seek(event)
        {
            if(seeking)
            {

                seekInput.value =  (event.clientX -getOffset(seekInput)) / (seekInput.offsetWidth) * 100;
                console.log("client x : "+event.clientX);
                console.log("offsetleft : "+getOffset(seekInput));
                console.log((event.clientX - getOffset(seekInput)) );
                console.log((seekInput.offsetWidth));
                console.log( (event.clientX - getOffset(seekInput)) / (seekInput.offsetWidth-getOffset(seekInput)));
                seekto =audio.duration * (seekInput.value / 100);
                audio.currentTime = seekto;

            }
        }

        function setVolume(event)
        {
            if(vseek)
            {
                audio.volume = (event.clientX-getOffset(volumeInput)) /(volumeInput.offsetWidth);
                var tmperc = (audio.volume*100)+"%";
                progressVolume.style.width = ""+tmperc+"";
            }
        }

        

        function pSong()
        {
            initSound(function(){
                if(!onrepeat){playlist_index--;}
                if(playlist_index == (song_queue.length-1) || playlist_index < 0){
                    console.log("masuk");
                    playlist_index = 0;	
                }
                
                audio.src = "assets/songs/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
                currentTitle.innerHTML = song_queue[playlist_index][3];
                currentArtist.innerHTML = song_queue[playlist_index][1];
                currentThumb.src = "assets/albums/album-"+song_queue[playlist_index][2]+".jpg";
                audio.play();

            })
        }
        function nSong()
        {
            initSound(function(){
                if(!onrepeat){playlist_index++;}
                if(playlist_index == song_queue.length || playlist_index < 0){
                    console.log("masuk");
                    playlist_index = 0;
                }
                
                audio.src = "assets/songs/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
                currentTitle.innerHTML = song_queue[playlist_index][3];
                currentArtist.innerHTML = song_queue[playlist_index][1];
                currentThumb.src = "assets/albums/album-"+song_queue[playlist_index][2]+".jpg";
                audio.play();
            })
            
        }


        
    }

}

function doLogout()
{   
    audio.pause();
    document.getElementsByTagName("BODY")[0].removeAttribute("class");
    document.getElementsByTagName("BODY")[0].classList.add("body-index");
    document.getElementsByTagName("BODY")[0].innerHTML = '<div id="background"> <div id="container"> <div id="leftContainer-menu"> <form id="loginForm" method="POST" onsubmit="login()"> <h2 class="centerhdua">Login to your Spotipu Account</h2> <p> <span id="err-username" class="errMessage"></span> <label for="login-username">Username</label> <input id="login-username"type="text" placeholder="Cheesie"> </p> <p> <span id="err-password" class="errMessage"></span> <label for="login-password">Password</label> <input id="login-password" type="password" placeholder="letmein"> </p> <button type="submit" name="login-button">LOG IN</button> </form> <div id="signup-offer" onclick="showSignupOffer()"> <span>Don\'t have an account yet? Signup Here.</span> </div> <form id="registerForm" method="post" onsubmit="register()"> <h2 class="centerhdua">Create your free account</h2> <p> <span id="err-signup-username" class="errMessage"></span> <label for="signup-username">Username</label> <input id="signup-username"type="text" placeholder=""> </p> <p> <span id="err-signup-email" class="errMessage"></span> <label for="signup-email">Email</label> <input id="signup-email"type="text" placeholder=""> </p> <p> <span id="err-signup-password" class="errMessage"></span> <label for="signup-password">Password</label> <input id="signup-password"type="password" placeholder=""> </p> <p> <span id="err-signup-passwordconf" class="errMessage"></span> <label for="signup-passwordconf">Confirm Password </label> <input id="signup-passwordconf"type="password" placeholder=""> </p> <button type="submit">SIGN UP</button> </form> <div id="login-offer" onclick="showLoginOffer()"> <span>Already have an account? login Here.</span> </div> </div> <div id="rightContainer-menu"> <h1>Get the right music, right now</h1> <h2 class="centerhdua">to millions of Songs for free.</h2> <ul> <li>Search & discover music you\'ll love</li> <li>Create Playlist of your favourite music</li> </ul> </div> </div> </div>';
    var registerForm = document.querySelector("#registerForm");
    var loginForm = document.querySelector("#loginForm");
    var loginOffer = document.querySelector("#login-offer");
    var signupOffer = document.querySelector("#signup-offer");
    console.log("index js");
    registerForm.style.display = "none";
    loginOffer.style.display = "none";
    doInit();
}

function doInit()
{
    if(!document.getElementsByTagName("BODY")[0].classList.contains("body-index"))
    {
        init("empty");
        console.log("audio player");
        initAudioPlayer();
    }
    else
    {
        registerForm = document.querySelector("#registerForm");
        loginForm = document.querySelector("#loginForm");
        loginOffer = document.querySelector("#login-offer");
        signupOffer = document.querySelector("#signup-offer");
        document.querySelector("#loginForm").addEventListener('submit', event =>{
            event.preventDefault();
        })
        
        document.querySelector("#registerForm").addEventListener('submit', event =>{
            event.preventDefault();
        })
    }
}













////// INDEX JS ////////
console.log("index js");
var registerForm = document.querySelector("#registerForm");
var loginForm = document.querySelector("#loginForm");
var loginOffer = document.querySelector("#login-offer");
var signupOffer = document.querySelector("#signup-offer");
console.log("index js");
registerForm.style.display = "none";
loginOffer.style.display = "none";

document.querySelector("#loginForm").addEventListener('submit', event =>{
    event.preventDefault();
})

document.querySelector("#registerForm").addEventListener('submit', event =>{
    event.preventDefault();
})

function showSignupOffer()
{
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    loginOffer.style.display = "block";
    signupOffer.style.display= "none";
}

function showLoginOffer()
{
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    signupOffer.style.display = "block";
    loginOffer.style.display= "none";
}




users = [];
var cheesie = new Array("Cheesie","Cheesie@gmail.com","letmein", []);
users.push(cheesie);

function login()
{
    var username = document.querySelector("#login-username");
    var password = document.querySelector("#login-password");
    document.querySelector("#err-password").textContent = "";
    document.querySelector("#err-username").textContent = "";

    
    var flag  =0;
    for(var a=0;a<users.length;a++)
    {
        
        if(username.value.toLowerCase() === users[a][0].toLowerCase() || username.value.toLowerCase() === users[a][1].toLowerCase())
        {
            if(password.value === users[a][2])
            {
                var idx = 0; select = 0;
                console.log("login success");
                user_data.forEach(function(elem){
                    if(username.value.toLowerCase() === elem[0].toLowerCase())
                    {
                        selected_user = idx;
                    }
                    idx++;

                })
                flag = 1;
                callLanding();
            }
            else
            {
                flag = 1;
                document.querySelector("#err-password").textContent = "Login Credential doesn't match";
            }
            
        }
    }
    if(flag ==0)
    {
        document.querySelector("#err-username").textContent = "User "+username.value+" doesn't exist";
    }
}

var alphas = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var digits = "0123456789";

function isAlpha(c) {
        return (alphas.indexOf(c) != -1);
}

function isDigit(c) {
        return (digits.indexOf(c) != -1);
}

function register()
{
    var username = document.querySelector("#signup-username");
    var email  = document.querySelector("#signup-email");
    var password = document.querySelector("#signup-password");
    var passwordconf = document.querySelector("#signup-passwordconf");
    document.querySelector("#err-signup-username").textContent = "";
    document.querySelector("#err-signup-password").textContent = "";
    document.querySelector("#err-signup-email").textContent = "";
    document.querySelector("#err-signup-passwordconf").textContent = "";

    var validate = 0;

    if(username.value.length < 5 || username.value.length > 15)
    {
        validate = 1;
        document.querySelector("#err-signup-username").textContent = "Username must be between 5 and 15 characters long";
    }
    var checkAvailability = 0;
    for(var a=0;a<users.length;a++)
    {
        if(username.value.toLowerCase() === users[a][0].toLowerCase())
        {
            validate = 1;
            document.querySelector("#err-signup-username").textContent = "Username is already taken";
        }
    }
    if(email.value.search('@') === -1 || email.value.search('.')===-1 || email.value.indexOf('.')=== email.value.indexOf("@")+1 ||  email.value[0] === '@' || email.value[0] === '.' || email.value[email.length-1] === '@' ||email.value[email.length-1] === '.'    )
    {
        validate = 1;
        document.querySelector("#err-signup-email").textContent = "Not valid email format";
    }
    checkAvailability = 0;
    for(var a=0;a<users.length;a++)
    {
        if(email.value.toLowerCase() === users[a][1].toLowerCase())
        {
            validate = 1;
            document.querySelector("#err-signup-email").textContent = "Email is already taken";
        }
    }
    var checkNum = 0, checkAlpha = 0;
    for(var a=0;a<password.value.length;a++)
    {
        if(isAlpha(password.value[a]))
        {
            checkAlpha = 1;
        }
        else if(isDigit(password.value[a]))
        {
            checkNum  = 1;
        }
    }
    console.log(checkNum);
    console.log(checkAlpha);
    if(checkNum === 0  || checkAlpha === 0 || password.value.length < 5)
    {
        validate =1;
        document.querySelector("#err-signup-password").textContent = "Password must contain alphabet and numeric value and must be longer than 5 characters";
    }

    if(passwordconf.value !== password.value)
    {
        validate = 1;
        document.querySelector("#err-signup-passwordconf").textContent = "Password confirmation doesn't match!";

    }

    if(validate ===0)
    {
        users.push(new Array(username.value,email.value,password.value,[]));
        var search_user = "";
        var idx = 0, select = 0;
        //["Cheesie",[["KPop","WJSN","From WJSN","I Wish","01:00"],["KPop","WJSN","The Secret","Secret","01:00"]]]
        user_data.forEach(function(elem){
            if(username.value.toLowerCase() === elem[0].toLowerCase())
            {
                search_user = elem[0];
                select = idx;
            }
            idx++;
            
        })
        if(search_user === "")
        {
            user_data.push([username.value,[]]);
            selected_user = user_data.length -1;
        }
        else
        {
            selected_user  =select;
        }

        callLanding();

        

    }
    
}


function callLanding()
{
    
    document.getElementsByTagName("BODY")[0].removeAttribute("class");
    
    document.getElementsByTagName("BODY")[0].innerHTML = '<div id="navBarContainer"> <div id="navbar"> <div id="logo"> <img src="assets/icons/spotify-logo.png" alt=""> </div> <div class="section session"> <div class="section-item middle" class="navbar-search" onclick="gotoSearch()"> <div>Search <svg class="icon" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor" fill-rule="evenodd"></path></svg> </div> </div> <div class="section-item middle" class="navbar-home" onclick="backtoHome()"> <div> Home <svg class="icon" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z" fill="currentColor"></path></svg> </div> </div> <div class="section-item middle" class="navbar-library" onclick="gotoLibrary()"> Your LIbrary <svg class="icon" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z" fill="currentColor"></path></svg> </div> </div> <div class="section last"> <div class="section-item " onclick="doLogout()"> Log Out </div> </div> </div> </div> <div id="playerContainer" style="z-index: 50;"> <div class="section-2"><div class="thumbContainer"> <img id="now-thumb" src="assets/genres/genre-indonesia.jpg" alt="" ></div> <span id="now-detail"> <span id="now-title">Title</span> <span id="now-artist">Various Artist</span> </span>  </div> <div class="section-2" id="player"> <div id="controls"> <img id="control-shuffle" class="control-item" src="assets/icons/shuffle.png" alt=""> <img id="control-previous" class="control-item" src="assets/icons/previous.png" alt=""> <img id="control-play" class="control-item-special" src="assets/icons/play.png" alt=""> <img id="control-next" class="control-item" src="assets/icons/next.png" alt=""> <img id="control-repeat" class="control-item" src="assets/icons/repeat.png" alt=""> </div> <div id="seeker"> <span id="current" class="progressTime ">0.00</span> <div id="progressBar"> <div id="progressBarBg-seeker"> <div class="progress" id="progress-song"></div> </div> <input id="input-seeker" type="range" min="0" max="100" value="0" step="1"> </div> <span id="remaining" class="progressTime ">0.00</span> </div> </div> <div class="section-2 lastControl"> <div class="test"> <img class="control-item" src="assets/icons/volume.png" alt=""> <div id="progressBarVolume"> <div id="progressBarBg-volume"> <div class="progress" id="progress-volume"></div> </div> <input id="input-volume" type="range" min="0" max="100" value="0" step="1"> </div> </div> </div> </div> <div id="context"> <p>Add New Song</p> <p>Remove song</p> </div> <div id="popupModalGenre" class="modal" > <div class="modal-content"> <span class="close" onclick="closeModal()">&times;</span> <h1>Add New Genre</h1><br><br> <h2>Genre Name</h2> <input type="text" id="input-genre-name"><br><br> <p id="input-genre-name-error" class="validation-error">test</p> <input type="checkbox" name="" id="input-genre-check"> <label for="input-genre-check">I\'ve copied genre thumbnail into assets/genres/ folder in genre-[Genre Name].jpg format</label><br><br> <p id="input-genre-check-error" class="validation-error">test</p> <button id="submitGenreButton" onclick="submitGenre()">Submit Genre</button> </div> </div> <div id="popupModalSong" class="modal"> <div class="modal-content"> <span class="close" onclick="closeModal()">&times;</span> <h1>Add New Song</h1><br><br> <h2>Song Name</h2> <input type="text" id="input-song-name"><br><br> <p id="input-song-name-error" class="validation-error">test</p> <h2>Song Duration</h2> <input type="text" id="input-song-duration"><br><br> <p id="input-song-duration-error" class="validation-error">test</p> <h2>Artist Name</h2> <input type="text" id="input-song-artist"><br><br> <p id="input-song-artist-error" class="validation-error">test</p> <h2>Album Name</h2> <input type="text" id="input-song-album"><br><br> <p id="input-song-album-error" class="validation-error">test</p> <input type="checkbox" name="" id="input-song-check"> <label for="input-song-check">I\'ve copied song\'s mp3 into assets/songs/ folder in [Artist Name]-[Album Name]-[Song Name].mp3 format, song\'s album into assets/albums/ folder in album-[Album Name].jpg format, and artist\'s banner into assets/banners/ folder in banner-[Artist Name].jpg format</label><br><br> <p id="input-song-check-error" class="validation-error">test</p> <button id="submitSongButton" onclick="submitSong()">Submit Song</button> </div> </div> <div id="mainContainer" class="t-landing"> <div id="title"> <h1>Genres & Moods</h1> <button id="playButton" onclick="">Add New Genre</button> </div> <div id="cardContainer"> </div> </div>';
    doInit();
}



