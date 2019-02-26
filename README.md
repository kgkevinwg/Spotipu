

SPOTIPU

Spotipu is a website to play and manage song playlist using Single Page Application concept. You, as a Software Laboratory Center trainee, are asked to make such website. 

Spotipu key functionality :
•	User Login & Register
•	View all registered song genre
•	View all registered album
•	View all registered artist
•	View all registered song
•	Search for Artist/Genre/Album/Song
•	Play songs based on selected genre/album/artist
•	Control song playback (Pause/Play, Previous, Next, Shuffle, Loop)
•	Add songs to library
•	Remove songs to library



	At first, Login page is shown, user is asked to input their Username and Password.
•	Validate that username is already registered.
•	Validate that inputted password is matched with registered user password.
•	Username “Cheesie” and password “letmein” is provided in the case for debugging purpose 
•	View error label below each input  text form if inputted data doesn’t satisfy login validation.
 

 
	User can register by clicking “Signup here” text, after that, user is asked to input Username, Email, Password, and Password confirmation data for the new user
•	Validate that username must be between 5 and 15 characters long
•	Validate that email is satisfying following email format rule:
o	Email must contain “@“ and ”.”  Symbols
o	“@” symbol cannot be followed by  “.”
o	Email cannot be started with “@” or “.”
o	Email cannot be ended with “@” or “.”
•	Validate that password must contain alphabet and numeric value and must be longer than 5 characters
•	Validate that confirm password must be same as password.
 
 
	On Successful login, show Spotipu’s navigation bar, player bar, and registered genre.
•	If user click on a genre thumbnail, show user selected genre page, and show all songs that belong to the selected genre.  
 

•	If user clicked on the play button, all songs from the selected genre will be loaded to the player and can be played.
•	User can also add new genre and songs by clicking “Add new Genre” or “Add new Song” button. A modal to input song/genre data will be shown. 
 
 
•	If the user wish to add new genre, following conditions must be done at first:
	User has copied new genre thumbnail into “assets/genres/” folder in genre-[Genre Name].jpg format
•	If the user wish to add new song, following conditions must be done at first:
	User has copied song's mp3 into assets/songs/ folder in [Artist Name]-[Album Name]-[Song Name].mp3 format, song's album into assets/albums/ folder in album-[Album Name].jpg format, and artist's banner into assets/banners/ folder in banner-[Artist Name].jpg format

	User can also search for registered Song/Genre/Album/Artist by clicking on the search button. 
•	User can input search query on the provided textbox.
•	If there are Song/genre/album/artist data that contains user’s query, show them with different layout based on the result type (Song/Genre/Album/Artist) 
 
 

•	If user’s query doesn’t match with any criteria, show no result error message  

•	If user’s query resulting any corresponding data, add user’s query to Recent Search data. Recent Search data is shown by clearing the search textbox. Recent Search can contain up to 3 most recent searches.  
 

•	If user clicked on one of the recent searches, corresponding recent search data would be shown with same layout rules as the search layout rules.

	User can also save songs to their library by right clicking songs title.
•	If right-clicked song is already in user’s library, show remove song context menu to remove selected song from user’s library 
 

•	Otherwise, show add song context menu to add selected song to user’s library.
 
•	If user remove a song from their library on “Your Library” page, remove selected song from the user’s library immediately.

	User can also control songs playback by clicking controls bottom on  the bottom of Spotipu’s page 
•	Spotipu’s player must have following capability:
	Show Currently playing Song’s title, artist, and album picture.
	Play/Pause current song on song queue
	Skip track by pressing next button
	Play previous track by pressing previous button
	Toggle Shuffle mode by pressing the shuffle button
•	If Shuffle mode is active, shuffle button will be green colored
•	Shuffle all tracks on current or future song queue using Fisher Yates Shuffle Algorithm.
	Toggle Loop mode by pressing the loop button
•	If Loop mode is active, loop button will be green colored
•	Loop currently playing tracks
	Seek through song by clicking/dragging the seek bar.
	Seek bar would show song’s current played time, song’s progress, and song’s duration
	Control song’s output volume by clicking/dragging the volume bar
	User can view Artist page by clicking artist name on search result or clicking artist name below every song title. Show the artist’s song and album on the page. 
 

 

	User can view Album page by clicking album name on search result or clicking artist name below every song title. Show all artist’s song and album on the page.  
	User can logout from Spotipu by clicking on the Logout button.




