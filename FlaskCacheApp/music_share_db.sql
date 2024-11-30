DROP DATABASE IF EXISTS music_app;
CREATE DATABASE music_app;
USE music_app;

CREATE TABLE Clients (
    username VARCHAR(50) PRIMARY KEY,    -- must be a unique name or won't be inserted
    password VARCHAR(128) NOT NULL,          -- reduced length; 128 fits most hash algorithms
    has_artist_permission VARCHAR(50) DEFAULT 'no' -- boolean for better clarity
);


CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(1000) NOT NULL
);

CREATE Table Artists(
    artist_name VARCHAR(250) PRIMARY KEY
);

CREATE TABLE Albums(
    album_name VARCHAR(250) PRIMARY KEY,
    artist_name VARCHAR(250),
    duration VARCHAR(50) NOT NULL,
    number_of_songs INT NOT NULL,
    album_image_url VARCHAR(1000) NOT NULL,
    Foreign Key (artist_name) REFERENCES Artists(artist_name)
);

CREATE Table Songs(
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    song_name VARCHAR(250) NOT NULL,
    artist_name VARCHAR(250) NOT NULL,
    album_name VARCHAR(250),
    duration VARCHAR(250) NOT NULL,
    Foreign Key (artist_name) REFERENCES Artists(artist_name),
    Foreign Key (album_name) REFERENCES Albums(album_name)
);

CREATE Table Liked_Songs(
    song_id INT,
    username VARCHAR(50),
    PRIMARY KEY (song_id, username),
    Foreign Key (song_id) REFERENCES Songs(song_id),
    Foreign Key (username) REFERENCES Clients(username)
);

-- TODO: insert artists, then albums, then songs!!

INSERT INTO Artists(artist_name)
VALUES ('Tyler, The Creator'),
('Massive Attack'),
('Fleetwood Mac'),
('Carol King'),
('Marvin Gaye'),
('Kate Bush'),
('Gil Scott-Heron'),
('PJ Harvey'),
('David Bowie'),
('Billie Eilish'),
('Jeff Buckley'),
('Metallica'),
('Michael Jackson'),
('Jimi Hendrix'),
('Ms. Lauryn Hill'),
('Mitski'),
('Talking Heads'),
('Björk'),
('Chappell Roan'),
('Glass Animals'),
('Radiohead'),
('Frank Sinatra'),
('Cocteau Twins'),
('Pink Floyd'),
('Beach House'),
('Queen'),
('Scott Joplin'),
('The Beach Boys'),
('Billy Idol'),
('Amy Winehouse'),
('The Buttress'), -- random, single artists as this and below (not making these up, i swear *cries*)
('fam0uz'), 
('Ty''s Music'),
('Nuvfr'),
('Xakei'),
('Siggerr'),
('Femtanyl'),
('Purity Filter'),
('Golemm'),
('Metaroom'),
('Last Dinosaurs'); 

INSERT INTO Albums(album_name, artist_name, duration, number_of_songs, album_image_url)
VALUES ('CHROMAKOPIA', 'Tyler, The Creator', '53min', 14, 'album_covers\chromakopia.png'),
('IGOR', 'Tyler, The Creator', '39min 46sec', 12, 'album_covers\igor.png'),
('Flower Boy', 'Tyler, The Creator', '46min 39sec', 14, 'album_covers\flower_boy.png'),
('Mezzanine', 'Massive Attack', '1hr 3min', 11, 'album_covers\mezzanine.png'),
('Rumours', 'Fleetwood Mac', '39min 58sec', 11, 'album_covers\rumours.png'),
('Tapestry', 'Carol King', '44min 33sec', 12, 'album_covers\tapestry.png'),
('What''s Going On', 'Marvin Gaye', '35min 32sec', 9, 'album_covers\whats_going_on.png'),
('Hounds of Love', 'Kate Bush', '47min 22sec', 12, 'album_covers\hounds_of_love.png'),
('The Sensual World', 'Kate Bush', '42min 3sec', 10, 'album_covers\the_sensual_world.png'),
('The Dreaming', 'Kate Bush', '43min 21sec', 10, 'album_covers\the_dreaming.png'),
('Pieces of a Man', 'Gil Scott-Heron', '1hr', 14, 'album_covers\pieces_of_a_man.png'),
('Stories From The City, Stories From The Sea', 'PJ Harvey', '47min 12sec', 12,'album_covers\stories_from_the_city_stories_from_the_sea.png'),
('The Rise and Fall of Ziggy Stardust and the Spiders from Mars', 'David Bowie', '38min 39sec', 11, 'album_covers\the_rise_and_fall_of_ziggy_stardust.png'),
('Young Americans', 'David Bowie', '40min 52sec', 8, 'album_covers\young_americans.png'),
('Aladdin Sane', 'David Bowie', '41min 45sec', 10, 'album_covers\aladdin_sane.png'),
('HIT ME HARD AND SOFT', 'Billie Eilish', '43min 50sec', 10, 'album_covers\git_me_hard_and_soft.png'),
('Grace', 'Jeff Buckley', '57min 3sec', 11, 'album_covers\grace.png'),
('Master of Puppets', 'Metallica', '54min 47sec', 8, 'album_covers\master_of_puppets.png'),
('Ride The Lightning', 'Metallica', '47min 25sec', 8, 'album_covers\ride_the_lightning.png'),
('Thriller', 'Michael Jackson', '42min 21sec', 9, 'album_covers\thriller.png'),
('Bad', 'Michael Jackson', '48min 10sec', 11, 'album_covers\bad.png'),
('Are You Experienced', 'Jimi Hendrix', '1hr', 17, 'album_covers\are_you_experienced.png'),
('The Miseducation of Lauryn Hill', 'Ms. Lauryn Hill' , '1hr 17min', 16, 'album_covers\The_Miseducation_of_Lauryn_Hill.png'),
('Remain in Light', 'Talking Heads', '40min 3sec', 8, 'album_covers\remain_in_light.png'),
('Debut', 'Björk', '48min 21sec', 11, 'album_covers\debut.png'),
('Homogenic', 'Björk', '43min 32sec', 10, 'album_covers\homogenic.png'),
('The Rise and Fall of a Midwest Princess', 'Chappell Roan', '49min 8sec', 14, 'album_covers\the_rise_and_fall_of_a_midwest_princess.png'),
('Puberty 2', 'Mitski', '31min 25sec', 11, 'album_covers\puberty_2.png'),
('Be the Cowboy', 'Mitski', '32min 34sec', 14, 'album_covers\be_the_cowboy.png'),
('How To Be A Human Being', 'Glass Animals' ,'43min 13sec', 11, 'album_covers\how_to_be_a_human_being.png'),
('OK Computer', 'Radiohead', '53min 41sec', 12, 'album_covers\ok_computer.png'),
('That''s Life', 'Frank Sinatra', '25min 33sec', 10, 'album_covers\thats_life.png'),
('Heaven or Las Vegas', 'Cocteau Twins', '37min 24sec', 10, 'album_covers\Heaven_or_Las_Vegas.png'),
('The Dark Side of the Moon', 'Pink Floyd', '42min 53sec', 10, 'album_covers\Dark_Side_of_the_Moon.png'),
('Animals', 'Pink Floyd', '41min 41sec', 5, 'album_covers\animals.png'),
('The Wall', 'Pink Floyd', '1hr 20min', 26, 'album_covers\the_wall.png'),
('Depression Cherry', 'Beach House', '44min 49sec', 9, 'album_covers\depression_cherry.png'),
('A Night At The Opera', 'Queen', '43min 4sec', 12, 'album_covers\A_Night_At_The_Opera.png'),
('Pet Sounds', 'The Beach Boys', '37min 21sec', 13, 'album_covers\pet_sounds.png'),
('Rebel Yell', 'Billy Idol', '38min 22sec', 9, 'album_covers\rebel_yell.png'),
('Back To Black', 'Amy Winehouse', '34min 46sec', 11, 'album_covers\back_to_black.png'),
('CHASER', 'Femtanyl', '13min 44sec', 6, 'album_covers\Chaser.jpg'),
('SHRAPNEL FLUX: VEILED TERMINAL', 'Purity Filter', '11min 10sec', 6, "album_covers\SHRAPNEL_FLUX.jpg"),
("Hazardous Bubble Basics", "Golemm", "15min 37sec", 8, "album_covers\Hazardous_Bubble_Basics.jpg");

INSERT INTO Songs(song_name, artist_name, album_name, duration)
VALUES ('St. Chroma', 'Tyler, The Creator', 'CHROMAKOPIA', '3:17'),
('Rah Tah Tah', 'Tyler, The Creator', 'CHROMAKOPIA', '2:45'),
('Noid', 'Tyler, The Creator', 'CHROMAKOPIA', '4:44'),
('Darling, I', 'Tyler, The Creator', 'CHROMAKOPIA', '4:13'),
('Hey, Jane', 'Tyler, The Creator', 'CHROMAKOPIA', '4:00'),
('I Killed You', 'Tyler, The Creator', 'CHROMAKOPIA', '2:48'),
('Judge Judy', 'Tyler, The Creator', 'CHROMAKOPIA', '4:29'),
('Sticky', 'Tyler, The Creator', 'CHROMAKOPIA', '4:15'),
('Take Your Mask Off', 'Tyler, The Creator', 'CHROMAKOPIA', '4:13'),
('Tomorrow', 'Tyler, The Creator', 'CHROMAKOPIA', '3:02'),
('Thought I Was Dead', 'Tyler, The Creator', 'CHROMAKOPIA', '3:27'),
('Like Him', 'Tyler, The Creator', 'CHROMAKOPIA', '4:38'),
('Balloon', 'Tyler, The Creator', 'CHROMAKOPIA', '2:34'),
('I Hope You Find Your Way Home', 'Tyler, The Creator', 'CHROMAKOPIA', '4:29'),
('IGNOR''S THEME', 'Tyler, The Creator', 'IGOR', '3:20'),
('EARFQUAKE', 'Tyler, The Creator', 'IGOR', '3:10'),
('I THINK', 'Tyler, The Creator', 'IGOR', '3:32'),
('EXACTLY WHAT YOU RUN FROM YOU END UP CHASING', 'Tyler, The Creator', 'IGOR', '0:14'),
('RUNNING OUT OF TIME', 'Tyler, The Creator', 'IGOR', '2:57'),
('NEW MAGIC WAND', 'Tyler, The Creator', 'IGOR', '3:15'),
('A BOY IS A GUN*', 'Tyler, The Creator', 'IGOR', '3:30'),
('PUPPET', 'Tyler, The Creator', 'IGOR', '2:59'),
('WHAT''S GOOD', 'Tyler, The Creator', 'IGOR', '3:25'),
('GONE, GONE / THANK YOU', 'Tyler, The Creator', 'IGOR', '6:15'),
('I DON''T LOVE YOU ANYMORE', 'Tyler, The Creator', 'IGOR', '2:41'),
('ARE WE STILL FRIENDS?', 'Tyler, The Creator', 'IGOR', '4:25'),
('Foreword', 'Tyler, The Creator', 'Flower Boy', '3:14'),
('Where This Flower Blooms', 'Tyler, The Creator', 'Flower Boy', '3:14'),
('Sometimes...', 'Tyler, The Creator', 'Flower Boy', '0:36'),
('See You Again', 'Tyler, The Creator', 'Flower Boy', '3:00'),
('Who Dat Boy', 'Tyler, The Creator', 'Flower Boy', '3:25'),
('Pothole', 'Tyler, The Creator', 'Flower Boy', '3:57'),
('Garden Shed', 'Tyler, The Creator', 'Flower Boy', '3:43'),
('Boredom', 'Tyler, The Creator', 'Flower Boy', '5:20'),
('I Ain''t Got Time!', 'Tyler, The Creator', 'Flower Boy', '3:26'),
('911 / Mr. Lonely', 'Tyler, The Creator', 'Flower Boy', '4:15'),
('Droppin'' Seeds', 'Tyler, The Creator', 'Flower Boy', '1:00'),
('November', 'Tyler, The Creator', 'Flower Boy', '3:45'),
('Glitter', 'Tyler, The Creator', 'Flower Boy', '3:44'),
('Enjoy Right Now, Today', 'Tyler, The Creator', 'Flower Boy', '3:55'),
('Angel', 'Massive Attack', 'Mezzanine', '6:19'),
('Risingson', 'Massive Attack', 'Mezzanine', '4:58'),
('Teardrop', 'Massive Attack', 'Mezzanine', '5:30'),
('Inertia Creeps', 'Massive Attack', 'Mezzanine', '5:57'),
('Exchange', 'Massive Attack', 'Mezzanine', '4:11'),
('Dissolved Girl', 'Massive Attack', 'Mezzanine', '6:06'),
('Man Next Door', 'Massive Attack', 'Mezzanine', '5:56'),
('Black Milk', 'Massive Attack', 'Mezzanine', '6:21'),
('Group Four', 'Massive Attack', 'Mezzanine', '5:56'),
('(Exchange)', 'Massive Attack', 'Mezzanine', '6:19'),
('Second Hand News', 'Fleetwood Mac', 'Rumours', '2:56'),
('Dreams', 'Fleetwood Mac', 'Rumours', '4:17'),
('Never Going Back Again', 'Fleetwood Mac', 'Rumours', '2:14'),
('Don''t Stop', 'Fleetwood Mac', 'Rumours', '3:13'),
('Go Your Own Way', 'Fleetwood Mac', 'Rumours', '3:43'),
('Songbird', 'Fleetwood Mac', 'Rumours', '3:20'),
('The Chain', 'Fleetwood Mac', 'Rumours', '4:29'),
('You Make Loving Fun', 'Fleetwood Mac', 'Rumours', '3:33'),
('I Don''t Want to Know', 'Fleetwood Mac', 'Rumours', '4316'),
('Oh Daddy', 'Fleetwood Mac', 'Rumours', '3:56'),
('Gold Dust Woman', 'Fleetwood Mac', 'Rumours', '4:55'),
('I Feel the Earth Move', 'Carol King', 'Tapestry', '2:58'),
('So Far Away', 'Carol King', 'Tapestry', '3:55'),
('It''s Too Late', 'Carol King', 'Tapestry', '3:53'),
('Home Again', 'Carol King', 'Tapestry', '2:29'),
('Beautiful', 'Carol King', 'Tapestry', '3:06'),
('Way Over Yonder', 'Carol King', 'Tapestry', '4:43'),
('You''ve Got a Friend', 'Carol King', 'Tapestry', '5:08'),
('Where You Lead', 'Carol King', 'Tapestry', '3:20'),
('Will You Love Me Tomorrow', 'Carol King', 'Tapestry', '3:20'),
('Smackwater Jack', 'Carol King', 'Tapestry', '3:41'),
('Tapestry', 'Carol King', 'Tapestry', '3:13'),
('(You Make Me Feel Like) A Natural Woman', 'Carol King', 'Tapestry', '3:49'),
('What''s Going On', 'Marvin Gaye', 'What''s Going On', '3:53'),
('What''s Happening Brother', 'Marvin Gaye', 'What''s Going On', '2:43'),
('Flyin'' High (In The Friendly Sky)', 'Marvin Gaye', 'What''s Going On', '3:49'),
('Save The Childern', 'Marvin Gaye', 'What''s Going On', '4:03'),
('God Is Love', 'Marvin Gaye', 'What''s Going On', '1:41'),
('Mercy Mercy Me (The Ecology)', 'Marvin Gaye', 'What''s Going On', '3:13'),
('Right On', 'Marvin Gaye', 'What''s Going On', '7:32'),
('Wholy Holy', 'Marvin Gaye', 'What''s Going On', '3:07'),
('Inner City Blues (Make Me Wanna Holler)', 'Marvin Gaye', 'What''s Going On', '5:27'),
('Running Up That Hill', 'Kate Bush', 'Hounds of Love', '5:00'),
('Hounds of Love', 'Kate Bush', 'Hounds of Love', '3:02'),
('The Big Sky', 'Kate Bush', 'Hounds of Love', '4:35'),
('Mother Stands For Comfort', 'Kate Bush', 'Hounds of Love', '3:08'),
('CloudBusting', 'Kate Bush', 'Hounds of Love', '5:09'),
('And Dream Of Sheep', 'Kate Bush', 'Hounds of Love', '2:45'),
('Under Ice', 'Kate Bush', 'Hounds of Love', '2:22'),
('Waking The Witch', 'Kate Bush', 'Hounds of Love', '4:18'),
('Watching You Without Me', 'Kate Bush', 'Hounds of Love', '4:07'),
('Jig Of Life', 'Kate Bush', 'Hounds of Love', '4:03'),
('Hello Earth', 'Kate Bush', 'Hounds of Love', '6:12'),
('The Morning Fog', 'Kate Bush', 'Hounds of Love', '2:35'),
('The Sensual World', 'Kate Bush', 'The Sensual World', '3:57'),
('Love and Anger', 'Kate Bush', 'The Sensual World', '4:42'),
('The Fog', 'Kate Bush', 'The Sensual World', '5:06'),
('Reaching Out', 'Kate Bush', 'The Sensual World', '3:12'),
('Heads We''re Dancing', 'Kate Bush', 'The Sensual World', '5:20'),
('Deeper Understanding', 'Kate Bush', 'The Sensual World', '4:45'),
('Between A Man And A Woman', 'Kate Bush', 'The Sensual World', '3:30'),
('Never Be Mine', 'Kate Bush', 'The Sensual World', '3:44'),
('Rocket''s Tail', 'Kate Bush', 'The Sensual World', '4:07'),
('This Woman''s Work', 'Kate Bush', 'The Sensual World', '3:36'),
('Sat In Your Lap', 'Kate Bush', 'The Dreaming', '3:29'),
('There Goes A Tenner', 'Kate Bush', 'The Dreaming', '3:24'),
('Pull Out The Pin', 'Kate Bush', 'The Dreaming', '5:25'),
('Suspended In Gaffa', 'Kate Bush', 'The Dreaming', '3:54'),
('Leave It Open', 'Kate Bush', 'The Dreaming', '3:19'),
('The Dreaming', 'Kate Bush', 'The Dreaming', '4:40'),
('Night Of The Swallow', 'Kate Bush', 'The Dreaming', '5:22'),
('All The Love', 'Kate Bush', 'The Dreaming', '4:28'),
('Houdini', 'Kate Bush', 'The Dreaming', '3:49'),
('Get Out Of My House', 'Kate Bush', 'The Dreaming', '5:25'),
('The Revolution Will Not Be Televised', 'Gil Scott-Heron', 'Pieces of a Man', '3:07'),
('Save the Children', 'Gil Scott-Heron', 'Pieces of a Man', '4:27'),
('Lady Day and John Coltrane', 'Gil Scott-Heron', 'Pieces of a Man', '3:36'),
('Home Is Where the Hatred Is', 'Gil Scott-Heron', 'Pieces of a Man', '3:21'),
('When You Are Who You Are', 'Gil Scott-Heron', 'Pieces of a Man', '3:22'),
('I Think I''ll Call It Morning', 'Gil Scott-Heron', 'Pieces of a Man', '3:31'),
('Pieces of a Man', 'Gil Scott-Heron', 'Pieces of a Man', '4:54'),
('A Sign of the Ages', 'Gil Scott-Heron', 'Pieces of a Man', '4:02'),
('Or Down You Fall', 'Gil Scott-Heron', 'Pieces of a Man', '3:13'),
('The Needle''s Eye', 'Gil Scott-Heron', 'Pieces of a Man', '4:50'),
('The Prisoner', 'Gil Scott-Heron', 'Pieces of a Man', '9:26'),
('Chains', 'Gil Scott-Heron', 'Pieces of a Man', '3:25'),
('Peace', 'Gil Scott-Heron', 'Pieces of a Man', '6:08'),
('A Toast to the People', 'Gil Scott-Heron', 'Pieces of a Man', '3:25'),
('Big Exit', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '3:51'),
('Good Fortune', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '3:20'),
('A Place Called Home', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '3:42'),
('One Line', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '3:13'),
('Beautiful Feeling', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '3:59'),
('The Whores Hustle And The Hustlers Whore', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '3:57'),
('This Mess We''re In', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '3:55'),
('You Said Something', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '3:18'),
('Kamikaze', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '2:23'),
('This Is Love', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '3:46'),
('Horses In My Dreams', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '5:36'),
('We Float', 'PJ Harvey', 'Stories From The City, Stories From The Sea', '6:07'),
('Five Years', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '4:43'),
('Soul Love', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '3:34'),
('Moonage Daydream', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '4:39'),
('Starman', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '4:14'),
('It Ain''t Easy', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '2:57'),
('Lady Stardust', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '3:21'),
('Star', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '2:47'),
('Hang on to Yourself', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '2:39'),
('Ziggy Stardust', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '3:13'),
('Suffragette City', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '3:28'),
('Rock ''n'' Roll Suicide', 'David Bowie', 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '4:14'),
('Young Americans', 'David Bowie', 'Young Americans', '5:13'),
('Win', 'David Bowie', 'Young Americans', '4:47'),
('Fascination', 'David Bowie', 'Young Americans', '5:48'),
('Right', 'David Bowie', 'Young Americans', '4:22'),
('Somebody up There Likes Me', 'David Bowie', 'Young Americans', '6:36'),
('Across the Universe', 'David Bowie', 'Young Americans', '4:33'),
('Can You Hear Me', 'David Bowie', 'Young Americans', '5:08'),
('Fame', 'David Bowie', 'Young Americans', '4:21'),
('Watch That Man', 'David Bowie', 'Aladdin Sane', '4:30'),
('Aladdin Sane', 'David Bowie', 'Aladdin Sane', '5:10'),
('Drive-In Saturday', 'David Bowie', 'Aladdin Sane', '4:32'),
('Panic in Detroit', 'David Bowie', 'Aladdin Sane', '4:32'),
('Cracked Actor', 'David Bowie', 'Aladdin Sane', '3:01'),
('Time', 'David Bowie', 'Aladdin Sane', '5:15'),
('The Prettiest Star', 'David Bowie', 'Aladdin Sane', '3:31'),
('Let''s Spend the Night Together', 'David Bowie', 'Aladdin Sane', '3:10'),
('The Jean Genie', 'David Bowie', 'Aladdin Sane', '4:08'),
('Lady Grinning Soul', 'David Bowie', 'Aladdin Sane', '4:30'),
('SKINNY', 'Billie Eilish', 'HIT ME HARD AND SOFT', '3:39'),
('LUNCH', 'Billie Eilish', 'HIT ME HARD AND SOFT', '2:59'),
('CHIHIRO', 'Billie Eilish', 'HIT ME HARD AND SOFT', '5:03'),
('BIRDS OF A FEATHER', 'Billie Eilish', 'HIT ME HARD AND SOFT', '3:30'),
('WILDFLOWER', 'Billie Eilish', 'HIT ME HARD AND SOFT', '4:21'),
('THE GREATEST', 'Billie Eilish', 'HIT ME HARD AND SOFT', '4:53'),
('L''AMOUR DE MA VIE', 'Billie Eilish', 'HIT ME HARD AND SOFT', '5:33'),
('THE DINER', 'Billie Eilish', 'HIT ME HARD AND SOFT', '3:06'),
('BITTERSUITE', 'Billie Eilish', 'HIT ME HARD AND SOFT', '4:58'),
('BLUE', 'Billie Eilish', 'HIT ME HARD AND SOFT', '5:43'),
('Mojo Pin', 'Jeff Buckley', 'Grace', '5:42'),
('Grace', 'Jeff Buckley', 'Grace', '5:22'),
('Last Goodbye', 'Jeff Buckley', 'Grace', '4:35'),
('Lilac Wine', 'Jeff Buckley', 'Grace', '4:32'),
('So Real', 'Jeff Buckley', 'Grace', '4:43'),
('Hallelujah', 'Jeff Buckley', 'Grace', '5:22'),
('Lover, You Should''ve Come Over', 'Jeff Buckley', 'Grace', '6:44'),
('Corpus Christi Carol', 'Jeff Buckley', 'Grace', '2:56'),
('Eternal Life', 'Jeff Buckley', 'Grace', '4:52'),
('Dream Brother', 'Jeff Buckley', 'Grace', '5:26'),
('Forget Her', 'Jeff Buckley', 'Grace', '5:22'),
('Battery', 'Metallica', 'Master of Puppets', '5:12'),
('Master Of Puppets', 'Metallica', 'Master of Puppets', '8:35'),
('The thing That Should Not Be', 'Metallica', 'Master of Puppets', '6:36'),
('Welcome Home (Sanitarium)', 'Metallica', 'Master of Puppets', '6:27'),
('Disposable Heroes', 'Metallica', 'Master of Puppets', '8:16'),
('Leper Messiah', 'Metallica', 'Master of Puppets', '5:39'),
('Orion', 'Metallica', 'Master of Puppets', '8:27'),
('Damage, Inc.', 'Metallica', 'Master of Puppets', '5:32'),
('Fight Fire With Fire', 'Metallica', 'Ride The Lightning', '4:44'),
('Ride The Lightning', 'Metallica', 'Ride The Lightning', '6:36'),
('For Whom The Bell Tolls', 'Metallica', 'Ride The Lightning', '5:09'),
('Fade To Black', 'Metallica', 'Ride The Lightning', '6:57'),
('Trapped Under Ice', 'Metallica', 'Ride The Lightning', '4:04'),
('Escape', 'Metallica', 'Ride The Lightning', '4:23'),
('Creeping Death', 'Metallica', 'Ride The Lightning', '6:35'),
('The Call Of Ktulu', 'Metallica', 'Ride The Lightning', '8:53'),
('Wanna Be Startin'' Something''', 'Michael Jackson', 'Thriller', '6:03'),
('Baby Be Mine', 'Michael Jackson', 'Thriller', '4:20'),
('The Girl Is Mine', 'Michael Jackson', 'Thriller', '3:42'),
('Thriller', 'Michael Jackson', 'Thriller', '5:57'),
('Beat It', 'Michael Jackson', 'Thriller', '4:18'),
('Billie Jean', 'Michael Jackson', 'Thriller', '4:54'),
('Human Nature', 'Michael Jackson', 'Thriller', '4:06'),
('P.Y.T. (Pretty Young Thing)', 'Michael Jackson', 'Thriller', '3:59'),
('The Lady in My Life', 'Michael Jackson', 'Thriller', '5:00'),
('Bad', 'Michael Jackson', 'Bad', '4:07'),
('The Way You Make Me Feel', 'Michael Jackson', 'Bad', '4:58'),
('Speed Demon', 'Michael Jackson', 'Bad', '4:02'),
('Liberian Girl', 'Michael Jackson', 'Bad', '3:52'),
('Just Good Friends', 'Michael Jackson', 'Bad', '4:06'),
('Another Part of Me', 'Michael Jackson', 'Bad', '3:54'),
('Man in the Mirror', 'Michael Jackson', 'Bad', '5:18'),
('I Just Can''t Stop Loving You', 'Michael Jackson', 'Bad', '4:11'),
('Dirty Diana', 'Michael Jackson', 'Bad', '4:40'),
('Smooth Criminal', 'Michael Jackson', 'Bad', '4:17'),
('Leave Me Alone', 'Michael Jackson', 'Bad', '4:40'),
('Purple Haze', 'Jimi Hendrix', 'Are You Experienced', '2:50'),
('Manic Depression', 'Jimi Hendrix', 'Are You Experienced', '3:42'),
('Hey Joe', 'Jimi Hendrix', 'Are You Experienced', '3:30'),
('Love Or Confusion', 'Jimi Hendrix', 'Are You Experienced', '3:12'),
('May This Be Love', 'Jimi Hendrix', 'Are You Experienced', '3:10'),
('I Don''t Live Today', 'Jimi Hendrix', 'Are You Experienced', '3:54'),
('The Wind Cries Mary', 'Jimi Hendrix', 'Are You Experienced', '3:20'),
('Fire', 'Jimi Hendrix', 'Are You Experienced', '2:43'),
('Third Stone From The Sun', 'Jimi Hendrix', 'Are You Experienced', '6:44'),
('Foxey Lady', 'Jimi Hendrix', 'Are You Experienced', '3:18'),
('Are You Experienced?', 'Jimi Hendrix', 'Are You Experienced', '4:15'),
('Stone Free', 'Jimi Hendrix', 'Are You Experienced', '3:35'),
('51st Anniversary', 'Jimi Hendrix', 'Are You Experienced', '3:15'),
('Highway Chile', 'Jimi Hendrix', 'Are You Experienced', '3:32'),
('Can You See Me', 'Jimi Hendrix', 'Are You Experienced', '2:32'),
('Remember', 'Jimi Hendrix', 'Are You Experienced', '2:48'),
('Red House', 'Jimi Hendrix', 'Are You Experienced', '3:50'),
('Intro', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '0:47'),
('Lost Ones', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:33'),
('Ex-Factor', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:26'),
('To Zoin', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '6:09'),
('Doo Wop (That Thing)', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:20'),
('Superstar', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '4:57'),
('Final Hour', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '4:16'),
('When It Hurts so Bad', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:42'),
('I Used to Love Him', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:39'),
('Forgive Them Father', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:15'),
('Every Ghetto, Every City', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:14'),
('Nothing Even Matters', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:50'),
('Everything Is Everything', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '4:53'),
('The Miseducation of Lauryn Hill', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:26'),
('Can''t Take My Eyes Off of You - (I Love You Baby)', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:26'),
('Tell Him', 'Ms. Lauryn Hill', 'The Miseducation of Lauryn Hill', '5:26'),
('Born Under Punches (The Heat Goes On)', 'Talking Heads', 'Remain in Light', '5:48'),
('Crosseyed and Painless', 'Talking Heads', 'Remain in Light', '4:45'),
('The Great Curve', 'Talking Heads', 'Remain in Light', '6:27'),
('Once in a Lifetime', 'Talking Heads', 'Remain in Light', '4:19'),
('Houses in Motion', 'Talking Heads', 'Remain in Light', '4:33'),
('Seen and Not Seen', 'Talking Heads', 'Remain in Light', '3:24'),
('Listening Wind', 'Talking Heads', 'Remain in Light', '4:43'),
('The Overload', 'Talking Heads', 'Remain in Light', '4:45'),
('Human Behaviour', 'Björk', 'Debut', '4:12'),
('Crying', 'Björk', 'Debut', '4:49'),
('Venus as a Boy', 'Björk', 'Debut', '4:42'),
('There''s More to Life Than This', 'Björk', 'Debut', '3:21'),
('Like Someone in Love', 'Björk', 'Debut', '4:33'),
('Big Time Sensuality', 'Björk', 'Debut', '3:56'),
('One Day', 'Björk', 'Debut', '5:24'),
('Aeroplane', 'Björk', 'Debut', '3:54'),
('Come to Me', 'Björk', 'Debut', '4:55'),
('Violently Happy', 'Björk', 'Debut', '4:59'),
('The Anchor Song', 'Björk', 'Debut', '4:49'),
('Hunter', 'Björk', 'Homogenic', '4:13'),
('Joga', 'Björk', 'Homogenic', '5:05'),
('Unravel', 'Björk', 'Homogenic', '3:17'),
('Bachelorette', 'Björk', 'Homogenic', '5:16'),
('All Neon Like', 'Björk', 'Homogenic', '5:52'),
('5 Years', 'Björk', 'Homogenic', '4:29'),
('Immature', 'Björk', 'Homogenic', '4:13'),
('Alarm Call', 'Björk', 'Homogenic', '4:19'),
('Pluto', 'Björk', 'Homogenic', '3:19'),
('All Is Full of Love', 'Björk', 'Homogenic', '4:13'),
('Femininomenon', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:39'),
('Red Wine Supernova', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:12'),
('After Midnight', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:24'),
('Coffee', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:25'),
('Casual', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:52'),
('Super Graphic Ultra Modern Girl', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:03'),
('HOT TO GO!', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:04'),
('My Kink Is Karma', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:42'),
('Picture You', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:07'),
('Kaleidoscope', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:42'),
('Pink Pony Club', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '4:18'),
('Naked In Manhattan', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:31'),
('California', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:18'),
('Guilty Pleasure', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:44'),
('Happy', 'Mitski', 'Puberty 2', '3:40'),
('Dan the Dancer', 'Mitski', 'Puberty 2', '2:25'),
('Once More to See You', 'Mitski', 'Puberty 2', '3:00'),
('Fireworks', 'Mitski', 'Puberty 2', '2:37'),
('Your Best American Girl', 'Mitski', 'Puberty 2', '3:32'),
('I Bet on Losing Dogs', 'Mitski', 'Puberty 2', '2:50'),
('My Body''s Made of Crushed Little Stars', 'Mitski', 'Puberty 2', '1:56'),
('Thursday Girl', 'Mitski', 'Puberty 2', '3:08'),
('A Loving Feeling', 'Mitski', 'Puberty 2', '1:32'),
('Crack Baby', 'Mitski', 'Puberty 2', '4:52'),
('A Burning Hill', 'Mitski', 'Puberty 2', '1:49'),
('Geyser', 'Mitski', 'Be the Cowboy', '2:23'),
('Why Didn''t You Stop Me?', 'Mitski', 'Be the Cowboy', '2:21'),
('Old Friend', 'Mitski', 'Be the Cowboy', '1:52'),
('A Pearl', 'Mitski', 'Be the Cowboy', '2:36'),
('Lonesome Love', 'Mitski', 'Be the Cowboy', '1:50'),
('Remember My Name', 'Mitski', 'Be the Cowboy', '2:15'),
('Me and My Husband', 'Mitski', 'Be the Cowboy', '2:17'),
('Come into the Water', 'Mitski', 'Be the Cowboy', '1:32'),
('Nobody', 'Mitski', 'Be the Cowboy', '3:13'),
('Pink in the Night', 'Mitski', 'Be the Cowboy', '2:16'),
('A Horse Named Cold Air', 'Mitski', 'Be the Cowboy', '2:03'),
('Washing Machine Heart', 'Mitski', 'Be the Cowboy', '2:08'),
('Blue Light', 'Mitski', 'Be the Cowboy', '1:43'),
('Two Slow Dancers', 'Mitski', 'Be the Cowboy', '3:59'),
('Life Itself', 'Glass Animals', 'How To Be A Human Being', '4:41'),
('Youth', 'Glass Animals', 'How To Be A Human Being', '3:50'),
('Season 2 Episode 3', 'Glass Animals', 'How To Be A Human Being', '4:03'),
('Pork Soda', 'Glass Animals', 'How To Be A Human Being', '4:13'),
('Mama''s Gun', 'Glass Animals', 'How To Be A Human Being', '4:26'),
('Cane Shuga', 'Glass Animals', 'How To Be A Human Being', '3:16'),
('[Premade Sandwiches]', 'Glass Animals', 'How To Be A Human Being', '0:36'),
('The Other Side Of Paradise', 'Glass Animals', 'How To Be A Human Being', '5:20'),
('Take A Slice', 'Glass Animals', 'How To Be A Human Being', '3:49'),
('Popular St', 'Glass Animals', 'How To Be A Human Being', '4:22'),
('Agnes', 'Glass Animals', 'How To Be A Human Being', '4:31'),
('Airbag', 'Radiohead', 'OK Computer', '4:47'),
('Paranoid Android', 'Radiohead', 'OK Computer', '6:27'),
('Subterranean Homesick Alien', 'Radiohead', 'OK Computer', '4:27'),
('Exit Music (For A Film)', 'Radiohead', 'OK Computer', '4:27'),
('Let Down', 'Radiohead', 'OK Computer', '4:59'),
('Karma Police', 'Radiohead', 'OK Computer', '4:24'),
('Fitter Happier', 'Radiohead', 'OK Computer', '1:57'),
('Electioneering', 'Radiohead', 'OK Computer', '3:50'),
('Climbing Up the Walls', 'Radiohead', 'OK Computer', '4:45'),
('No Surprises', 'Radiohead', 'OK Computer', '3:49'),
('Lucky', 'Radiohead', 'OK Computer', '4:18'),
('The Tourist', 'Radiohead', 'OK Computer', '5:26'),
('That''s Life', 'Frank Sinatra', 'That''s Life', '3:07'),
('I Will Wait For You', 'Frank Sinatra', 'That''s Life', '2:16'),
('Somewhere My Love (Lara''s Theme)', 'Frank Sinatra', 'That''s Life', '2:16'),
('Sand And Sea', 'Frank Sinatra', 'That''s Life', '2:26'),
('What Now My Love', 'Frank Sinatra', 'That''s Life', '2:30'),
('Winchester Cathedral', 'Frank Sinatra', 'That''s Life', '2:35'),
('Give Her Love', 'Frank Sinatra', 'That''s Life', '2:11'),
('Tell Her (You Love Her Each Day)', 'Frank Sinatra', 'That''s Life', '2:40'),
('The Impossible Dream (The Quest)', 'Frank Sinatra', 'That''s Life', '2:31'),
('You''re Gonna Hear From Me', 'Frank Sinatra', 'That''s Life', '2:57'),
('Cherry-colured Funk', 'Cocteau Twins', 'Heaven or Las Vegas', '3:12'),
('Pitch the Baby', 'Cocteau Twins', 'Heaven or Las Vegas', '3:14'),
('Iceblink Luck', 'Cocteau Twins', 'Heaven or Las Vegas', '3:18'),
('Fifty-fifty Clown', 'Cocteau Twins', 'Heaven or Las Vegas', '3:10'),
('Heaven or Las Vegas', 'Cocteau Twins', 'Heaven or Las Vegas', '4:58'),
('I Wear Your Ring', 'Cocteau Twins', 'Heaven or Las Vegas', '3:29'),
('Fotzepolitic', 'Cocteau Twins', 'Heaven or Las Vegas', '3:30'),
('Wolf in the Breast', 'Cocteau Twins', 'Heaven or Las Vegas', '3:31'),
('Road, River, and Rail', 'Cocteau Twins', 'Heaven or Las Vegas', '3:21'),
('Frou-frou Foxes in Midsummer Fires', 'Cocteau Twins', 'Heaven or Las Vegas', '5:38'),
('Speak to Me', 'Pink Floyd', 'The Dark Side of the Moon', "1:05"),
('Breathe (In the Air)', 'Pink Floyd', 'The Dark Side of the Moon', "2:49"),
('On the Run', 'Pink Floyd', 'The Dark Side of the Moon', "3:45"),
('Time', 'Pink Floyd', 'The Dark Side of the Moon', "6:53"),
('The Great Gig in the Sky', 'Pink Floyd', 'The Dark Side of the Moon', "4:43"),
('Money', 'Pink Floyd', 'The Dark Side of the Moon', "6:22"),
('Us and Them', 'Pink Floyd', 'The Dark Side of the Moon', "7:49"),
('Any Colour You Like', 'Pink Floyd', 'The Dark Side of the Moon', "3:26"),
('Brain Damage', 'Pink Floyd', 'The Dark Side of the Moon', "3:46"),
('Eclipse', 'Pink Floyd', 'The Dark Side of the Moon', "2:10"),
('Pigs on the Wing 1', 'Pink Floyd', 'Animals', '1:24'),
('Dogs', 'Pink Floyd', 'Animals', '17:05'),
('Pigs (Three Different Ones)', 'Pink Floyd', 'Animals', '11:25'),
('Sheep', 'Pink Floyd', 'Animals', '10:19'),
('Pigs on the Wing 2', 'Pink Floyd', 'Animals', '1:26'),
('In the Flesh?', 'Pink Floyd', 'The Wall', '3:18'),
('The Thin Ice', 'Pink Floyd', 'The Wall', '2:26'),
('Another Brick in the Wall, Pt.1', 'Pink Floyd', 'The Wall', '3:12'),
('The Happiest Days of Our Lives', 'Pink Floyd', 'The Wall', '1:50'),
('Another Brick in the Wall, Pt.2', 'Pink Floyd', 'The Wall', '3:58'),
('Mother', 'Pink Floyd', 'The Wall', '5:34'),
('Goodbye Blue Sky', 'Pink Floyd', 'The Wall', '2:47'),
('Empty Spaces', 'Pink Floyd', 'The Wall', '2:07'),
('Young Lust', 'Pink Floyd', 'The Wall', '3:29'),
('One of My Turns', 'Pink Floyd', 'The Wall', '3:36'),
('Don''t Leave Me Now', 'Pink Floyd', 'The Wall', '4:15'),
('Another Brick in the Wall, Pt.3', 'Pink Floyd', 'The Wall', '1:14'),
('Goodbye Cruel World', 'Pink Floyd', 'The Wall', '1:13'),
('Hey You', 'Pink Floyd', 'The Wall', '4:38'),
('Is There Anybody Out There?', 'Pink Floyd', 'The Wall', '2:41'),
('Nobody Home', 'Pink Floyd', 'The Wall', '3:23'),
('Vera', 'Pink Floyd', 'The Wall', '1:33'),
('Bring the Boys Back Home', 'Pink Floyd', 'The Wall', '1:27'),
('Comfortably Numb', 'Pink Floyd', 'The Wall', '6:22'),
('The Show Must Go On', 'Pink Floyd', 'The Wall', '1:36'),
('In the Flesh', 'Pink Floyd', 'The Wall', '4:15'),
('Run Like Hell', 'Pink Floyd', 'The Wall', '4:23'),
('Waiting for the Worms', 'Pink Floyd', 'The Wall', '3:57'),
('Stop', 'Pink Floyd', 'The Wall', '0:30'),
('The Trial', 'Pink Floyd', 'The Wall', '5:18'),
('Outside the Wall', 'Pink Floyd', 'The Wall', '1:44'),
('Levitation', 'Beach House', 'Depression Cherry', '5:54'),
('Sparks', 'Beach House', 'Depression Cherry', '5:21'),
('Space Song', 'Beach House', 'Depression Cherry', '5:20'),
('Beyond Love', 'Beach House', 'Depression Cherry', '4:25'),
('10:37', 'Beach House', 'Depression Cherry', '3:48'),
('PPP', 'Beach House', 'Depression Cherry', '6:08'),
('Wildflower', 'Beach House', 'Depression Cherry', '3:39'),
('Bluebird', 'Beach House', 'Depression Cherry', '3:55'),
('Days of Candy', 'Beach House', 'Depression Cherry', '6:15'),
('Death On Two Legs (Dedicated To...)', 'Queen', 'A Night At The Opera', '3:43'),
('Lazing On A Sunday Afternoon', 'Queen', 'A Night At The Opera', '1:07'),
('I''m In Love With My Car', 'Queen', 'A Night At The Opera', '3:04'),
('You''re My Best Friend', 'Queen', 'A Night At The Opera', '2:50'),
('''39', 'Queen', 'A Night At The Opera', '3:30'),
('Sweet Lady', 'Queen', 'A Night At The Opera', '4:02'),
('Seaside Rendezvous', 'Queen', 'A Night At The Opera', '2:14'),
('The Prophet''s Song', 'Queen', 'A Night At The Opera', '8:20'),
('Love Of My Life', 'Queen', 'A Night At The Opera', '3:37'),
('Good Company', 'Queen', 'A Night At The Opera', '3:23'),
('Bohemian Rhapsody', 'Queen', 'A Night At The Opera', '5:54'),
('God Save The Queen', 'Queen', 'A Night At The Opera', '1:15'),
('Wouldn''t It Be Nice', 'The Beach Boys', 'Pet Sounds', '2:33'),
('You Still Believe In Me', 'The Beach Boys', 'Pet Sounds', '2:36'),
('That''s Not Me', 'The Beach Boys', 'Pet Sounds', '2:31'),
('Don''t Talk (Put Your Head On My Shoulder)', 'The Beach Boys', 'Pet Sounds', '2:58'),
('I''m Waiting For The Day', 'The Beach Boys', 'Pet Sounds', '3:06'),
('Let''s Go Away For Awhile', 'The Beach Boys', 'Pet Sounds', '2:24'),
('Sloop John B', 'The Beach Boys', 'Pet Sounds', '2:59'),
('God Only Knows', 'The Beach Boys', 'Pet Sounds', '2:33'),
('I Know There''s An Answer', 'The Beach Boys', 'Pet Sounds', '2:33'),
('Here Today', 'The Beach Boys', 'Pet Sounds', '3:07'),
('I Just Wasn''t Made For These Times', 'The Beach Boys', 'Pet Sounds', '3:21'),
('Pet Sounds', 'The Beach Boys', 'Pet Sounds', '2:37'),
('Caroline, No', 'The Beach Boys', 'Pet Sounds', '2:51'),
('Rebel Yell', 'Billy Idol', 'Rebel Yell', '4:48'),
('Daytime Drama', 'Billy Idol', 'Rebel Yell', '4:04'),
('Eyes Without A Face', 'Billy Idol', 'Rebel Yell', '4:59'),
('Blue Highway', 'Billy Idol', 'Rebel Yell', '5:07'),
('Flesh For Fantasy', 'Billy Idol', 'Rebel Yell', '4:38'),
('Catch My Fall', 'Billy Idol', 'Rebel Yell', '3:44'),
('Crank Call', 'Billy Idol', 'Rebel Yell', '3:59'),
('(Do Not) Stand In The Shadows', 'Billy Idol', 'Rebel Yell', '3:12'),
('The Dead Next Door', 'Billy Idol', 'Rebel Yell', '3:48'),
('Rehab', 'Amy Winehouse', 'Back To Black', '3:33'),
('You Know I''m No Good', 'Amy Winehouse', 'Back To Black', '4:16'),
('Me & Mr. Jones', 'Amy Winehouse', 'Back To Black', '2:31'),
('Just Friends', 'Amy Winehouse', 'Back To Black', '3:11'),
('Back To Black', 'Amy Winehouse', 'Back To Black', '4:00'),
('Love Is A Losing Game', 'Amy Winehouse', 'Back To Black', '2:34'),
('Tears Dry On their Own', 'Amy Winehouse', 'Back To Black', '3:05'),
('Wake Up Alone', 'Amy Winehouse', 'Back To Black', '3:41'),
('Some Unholy War', 'Amy Winehouse', 'Back To Black', '2:21'),
('He Can Only Hold Her', 'Amy Winehouse', 'Back To Black', '2:44'),
('Addicted', 'Amy Winehouse', 'Back To Black', '3:33'),
('ACT RIGHT', 'Femtanyl', 'CHASER', '2:24'),
('P3T', 'Femtanyl', 'CHASER', '1:42'),
('PUSH UR T3MPRR', 'Femtanyl', 'CHASER', '2:28'),
('KATAMARI', 'Femtanyl', 'CHASER', '2:38'),
('MURDER EVERY 1 U KNOW', 'Femtanyl', 'CHASER', '2:05'),
('GIRL HELL 1999', 'Femtanyl', 'CHASER', '2:25'),
("Remnant Syphon", "Purity Filter", "SHRAPNEL FLUX: VEILED TERMINAL", "1:23"),
("Psionic Stasis Mask", "Purity Filter", "SHRAPNEL FLUX: VEILED TERMINAL", "2:08"),
("Eden (Exclusion Zone)", "Purity Filter", "SHRAPNEL FLUX: VEILED TERMINAL", "1:06"),
("Splinter Echo", "Purity Filter", "SHRAPNEL FLUX: VEILED TERMINAL", "2:51"),
("Neverland Chakra", "Purity Filter", "SHRAPNEL FLUX: VEILED TERMINAL", "1:32"),
("Crush Restore", "Purity Filter", "SHRAPNEL FLUX: VEILED TERMINAL", "2:08"),
("Watch out for Golem.", "Golemm", "Hazardous Bubble Basics", "1:44"),
("Felt Good", "Golemm", "Hazardous Bubble Basics", "2:09"),
("Bliss", "Golemm", "Hazardous Bubble Basics", "1:50"),
("Untouchable", "Golemm", "Hazardous Bubble Basics", "2:10"),
("Spiritual Realm", "Golemm", "Hazardous Bubble Basics", "1:31"),
("Villfarelse", "Golemm", "Hazardous Bubble Basics", "2:08"),
("Polliwogs", "Golemm", "Hazardous Bubble Basics", "2:33"),
("Ant Racing", "Golemm", "Hazardous Bubble Basics", "1:28");




-- SINGLES
INSERT INTO Songs(song_name, artist_name, album_name, duration)
VALUES ('Brutus (Instrumental)', 'The Buttress', NULL, '3:20'),
('As Time Flies', 'Ty''s Music', NULL, '1:00'),
('28 Days Later - Slowed', 'fam0uz', NULL, '3:58'),
('Ego', 'Mitski', NULL, '3:07'),
('MEDUSE', 'Nuvfr', NULL, '1:44'),
('Merry Go Round of Life (Old Piano)', 'Xakei', NULL, '1:20'),
('Good Luck, Babe!', 'Chappell Roan', NULL, '3:38'),
('Cop Car', 'Mitski', NULL, '3:09'),
('Moon', 'Siggerr', NULL, '3:44'),
('Maple Leaf Rag', 'Scott Joplin', NULL, '3:20'),
('I Get Around', 'The Beach Boys', NULL, '2:14'),
('Glide', 'Mitski', NULL, '3:41'),
('LOVESICK, CANNIBAL', 'Femtanyl', NULL, '1:56'),
('DINNER!', 'Femtanyl', NULL, '2:16');

