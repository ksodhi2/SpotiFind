import './App.css';
import clsx from 'clsx';
import React, {useState, useEffect, forwardRef} from "react";
import Axios from 'axios';
import Login from "./Login.js";
import {getTokenFromUrl} from "./Spotify";
import { Button,  Drawer, Box, Grid, Typography, AppBar, 
    Toolbar, IconButton, FormControl, FormControlLabel,
    Radio, RadioGroup, TextField, Select, MenuItem  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import Queries from "./Queries.js"
import TrackList from "./Components/TrackList";
import SpotifyPlayer from 'react-spotify-web-playback';
import { makeStyles, useTheme,createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {green, blueGrey} from '@material-ui/core/colors';
import { Autocomplete } from '@material-ui/lab';

const baseUrl = "https://ultra-aquifer-274120.uc.r.appspot.com"
//const baseUrl = "http://localhost:8080"


var Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();

const drawerWidth = 300;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginTop: "15vh"
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  appBarStyle: {
    padding: 0
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: blueGrey[900],
    color: "white",
    zIndex: 100
  },
  searchBar: {
    color: "white"
  }
}))

const artists = [{name: "Kanye"}, {name: "Jay-Z"}, {name: "Beyonce"}]

function App() {
  const classes = useStyles();
 
  
  const [openMenu, setOpenMenu] = useState(false);
  
  const [access,setAccess] = useState({});
  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [spotifyId, setSpotifyId] = useState("");
  const [topArtistsBySpotify, setTopArtistsBySpotify] = useState("");


  const [query, setQuery] = useState([null,null]);
  const [trackSearch, setTrackSearch] = useState("");
  const [trackResult, setTrackResult] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topGenres, setTopGenres] = useState([]);

  const [artistSearch, setArtistSearch] = useState([]);
  const [findTrackRes, setFindTrackRes] = useState([]);
  const [genreSearch, setGenreSearch] = useState([]);
  const [newTopTrack, setNewTopTrack] = useState("");
  const [newTopArtist, setNewTopArtist] = useState("");
  const [newTopGenre, setNewTopGenre] = useState("");
  const [topTrackRank, setTopTrackRank] = useState();
  const [topArtistRank, setTopArtistRank] = useState();
  const [topGenreRank, setTopGenreRank] = useState();
  

  const [uris, setUris] = useState([]);
  const [play,setPlay] = useState(false);
  const [album, setAlbum] = useState("");

  useEffect(() => {
    const hash = getTokenFromUrl();
    if(localStorage.spotifind_cache == null)
      localStorage.spotifind_cache =  Math.random().toString().substr(2, 10);
    
    const _token = hash.access_token;
    console.log(_token);
    setAccess(hash);

    if (_token) {
      setToken(_token);
      
    }

    

    spotifyApi.setAccessToken(_token);
    var _user;
    spotifyApi.getMe({}, (err,res) => {
      if(err != null) {
        console.log(err);
      } else {
        _user = res;
        setUserInfo(res);
        updateLogin(_user);
        console.log(_user);

      }
    });
    
  }, []);

  const playTracks = (trackUris) => {
    setUris(trackUris);
    setPlay(true);
  }

  const playTracksByName = (track_name) => {
    Axios.get(baseUrl + "/api/getTrackUri", {
      params: {
        track_name: track_name
      }
    }).then((res) => {
      console.log(res)
      setUris("spotify:track:" + res.data[0].track_id);
      //setPlay(true);
    })
    
    
  }

  const handleSpotifyState = (state) => {
    setPlay(state.isPlaying);
    
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      if (res.item != null )
        setAlbum(res.item.album.images[0].url)
    });
    
  }

  const updateLogin = async (user) => {
    //console.log(user);
    var _user;
    Axios.get(baseUrl + "/api/getLogin", {
      params: {
        user: user
      }
    }).then((res) => {
      _user = res.data;
      console.log(_user);
      setSpotifyId(_user.spotify_id);
      if(_user != "") {
        Axios.get(baseUrl + "/api/updateLogin", {
          params: {
            user: user,
            cache: localStorage.spotifind_cache
          }
        });
      } else {
        var id;
        Axios.get(baseUrl + "/api/getNewUserId")
        .catch((err) => console.log(err))
        .then(
          (res) => {
            id = res.data.max_id + 1;
            Axios.get(baseUrl + "/api/addNewUser", {
              params: {
                user: user,
                cache: localStorage.spotifind_cache,
                id: id
              }
            }).then((res) => {
              Axios.get(baseUrl + "/api/addNewLogin", {
              params: {
                user: user,
                cache: localStorage.spotifind_cache,
                id: id
              }
            }).then((res) => {
              //Update database with new user's top tracks
              spotifyApi.getMyTopTracks({time_range: "long_term", limit: 10, offset: 0}, (error, response) => {
                if(error == null){
                  var tracks = []
                  var rank = 1
                  response.items.forEach(track => {
                    tracks.push(`(${id},'${track.id}', ${rank})`);
                    rank++;
                  })
                  //console.log(tracks);
                  var trackItems = tracks.toString();
                  //console.log(trackItems);
                  Axios.get(baseUrl + "/api/addTopTracks", {
                    params: {
                      trackList: trackItems
                    }
                  }).then((res) => console.log(res))
                }
              })

              

              //Update database with new user's top artists
              spotifyApi.getMyTopArtists({time_range: "long_term", limit: 10, offset: 0}, async (error,response) => {
                if(error == null){
                  var artists = []
                  var i = 1;
                  var artistNames = ""
                  var artistRanks = {}
                  response.items.forEach(artist => {
                    if(i == 1) {
                      artistNames += `artist_name = "${artist.name}"`
                      
                    } else {
                      artistNames += `OR artist_name = "${artist.name}"`
                    }
                    artistRanks[artist.name] = i;
                    i++
                  });


                    Axios.get(baseUrl + "/api/getArtistsId", {
                      params: {
                        conditions: artistNames
                      }
                    }).then((res) => {
                     

                      var artistIds = res.data;
                      var addArtists = []
                      
                      artistIds.forEach((artist) => {
                        var rank = artistRanks[artist.artist_name]
                        addArtists.push(`(${id},'${artist.artist_id}', ${rank})`);
                      })

                      var artistValues = addArtists.toString();

                      Axios.get(baseUrl + "/api/addTopArtists", {
                        params: {
                          values: artistValues
                        }
                      }).then((res) => {
                        Axios.get(baseUrl + "/api/countTopGenres", {
                          params: {
                            userId: id
                          }
                        }).then((res) => {
                          var genres = []
                          var rank = 1
                          res.data.forEach((genre) => {
                            genres.push(`(${id}, ${genre.genre_id}, ${rank})`)
                            rank++;
                          })
                          console.log(genres.toString())
                          Axios.get(baseUrl + "/api/addTopGenres", {
                            params: {
                              values: genres
                            }
                          }).then((res) => console.log(res))
                        })
                      })
                    })
                  
                }
              })
            })
            })
          }
        )      
      }
    })
  }

  const searchTracks = (search) => {
    Axios.get(baseUrl + "/api/searchTracks", {
      params: {
        trackName: search
      }
    }).then((res) => {
      console.log(res);
      setTrackResult([]);
      var tracks = []
      res.data.forEach(element => {
        tracks.push(element.track_id);
      });

      spotifyApi.getTracks(tracks, {}, (err,response) => {
        if(response != null)
          setTrackResult(response.tracks);
        
      })
     
     
    });
  }


  const findTopArtistsBySpotifyId = () => {
    Axios.get(baseUrl + "/api/logins/getTopArtists", {
      params: {uri: spotifyId}
    }).then((res) => setTopArtistsBySpotify(JSON.stringify(res.data)));
  }

  const handleSearchCategory = (event) => {
    setQuery([event.target.value, null])
    var category = event.target.value;
    if(category == 'country'){
      Axios.get(baseUrl + "/api/getTracksByCountry", {
        params: {
          spotifyId: spotifyId
        }
      }).then((res) =>{
        var tracks = []
        res.data.forEach(track => {
          
          tracks.push(track.track_id)
        })
        //console.log(res)

        spotifyApi.getTracks(tracks, {}, (err,response) => {
          if(response != null)
            setTrackResult(response.tracks);
          
        })
        
      })
    } 
  }

  const handleSoundSearch = (event) => {
    var q = query;
    q[1] = event.target.value;
    setQuery(q);
    

    var qual = event.target.value;
    if(qual != "popularity"){
      Axios.get(baseUrl + "/api/getTracksBySound", {
        params: {
          spotifyId: spotifyId,
          soundProp: qual
        }
      }).then((res)=>{
        setTrackResult([]);
        var tracks = []
        res.data.forEach(element => {
          tracks.push(element.track_id);
        });
        
        spotifyApi.getTracks(tracks, {}, (err,response) => {
          if(response != null)
            
            setTrackResult(response.tracks);
        })
      })
    } else {
      Axios.get(baseUrl + "/api/getTracksByPopularity", {
        params: {
          spotifyId: spotifyId
          
        }
      }).then((res)=>{
        
        setTrackResult([]);
        var tracks = []
        res.data.forEach(element => {
          tracks.push(element.track_id);
        });
        console.log(tracks)
        
        spotifyApi.getTracks(tracks, {}, (err,response) => {
          if(response != null)
            
            setTrackResult(response.tracks);
        })
      })
    }
    
  }

  const handleTopSearch = (event) => {
    var q = query;
    q[1] = event.target.value;
    setQuery(q);
    
    var top = event.target.value;
    if(top == "topArtists"){
      Axios.get(baseUrl + "/api/getTracksByTopArtists", {
        params: {
          spotifyId: spotifyId
        }
      }).then((res) => {
        var tracks = []
        res.data.forEach(track => {
          
          tracks.push(track.track_id)
        })
        

        spotifyApi.getTracks(tracks, {}, (err,response) => {
          if(response != null)
            setTrackResult(response.tracks);
          
        })
      })
    } else if (top == "topTracks") {
      Axios.get(baseUrl + "/api/getTopTracks", {
        params: {
          spotifyId: spotifyId
        }
      }).then((res) => {
        var tracks = []
        res.data.forEach(track => {
          tracks.push(track.track_id)
        })
        

        spotifyApi.getTracks(tracks, {}, (err,response) => {
          if(response != null)
            setTrackResult(response.tracks);
          
        })
      })
    } else if (top == "topGenres") {
      Axios.get(baseUrl + "/api/getTracksByTopGenres", {
        params: {
          spotifyId: spotifyId
        }
      }).then((res) => {
        var tracks = []
        res.data.forEach(track => {
          tracks.push(track.track_id)
        })
        

        spotifyApi.getTracks(tracks, {}, (err,response) => {
          if(response != null)
            setTrackResult(response.tracks);
          
        })
      })
    }
    
  }

  const getTopInfo = () => {
    Axios.get(baseUrl + "/api/getTopTracks", {
      params: {
        spotifyId: spotifyId
      }
    }).then((res) => {
      console.log(res.data)
      setTopTracks(res.data)
      
    })

    Axios.get(baseUrl + "/api/getTopArtists", {
      params: {
        spotifyId: spotifyId
      }
    }).then((res) => {
      setTopArtists(res.data)
      
    })

    Axios.get(baseUrl + "/api/getTopGenres", {
      params: {
        spotifyId: spotifyId
      }
    }).then((res) => {
      setTopGenres(res.data)
      
    })
  }

  const openPopupMenu = () => {
    setOpenPopup(true);
    getTopInfo();
  }

  const findTracks = (event) => {
    
    Axios.get(baseUrl + "/api/trackSearch", {
      params: {
        name: event.target.value
      }
    }).then((res) => setFindTrackRes(res.data))
  }

  const searchArtists = (event) => {
    Axios.get(baseUrl + "/api/searchArtists", {
      params: {
        name: event.target.value
      }
    }).then((res) => setArtistSearch(res.data))
  }
  const searchGenres = (event) => {
    Axios.get(baseUrl + "/api/searchGenres", {
      params: {
        name: event.target.value
      }
    }).then((res) => {setGenreSearch(res.data)
    console.log(res.data)})
  }

  const submitChanges = () => {
    //console.log(newTopTrack,newTopArtist, newTopGenre, topTrackRank, topArtistRank, topGenreRank)
    Axios.get(baseUrl + "/api/setTopList", {
      params: {
        spotifyId1: newTopGenre != '' ? spotifyId : '',
        spotifyId2: newTopTrack != '' ? spotifyId : '',
        spotifyId3:  newTopArtist != '' ? spotifyId : '',

        
        genreId: newTopGenre,
        genreRank: topGenreRank,

        artistId: newTopArtist,
        artistRank: topArtistRank,

        trackId: newTopTrack,
        trackRank: topTrackRank
      }
    }).then((res) => {
      
      getTopInfo();
      setNewTopGenre("");
      setNewTopArtist("");
      setNewTopTrack("");
    })
  }

  
  const rankings = [1,2,3,4,5,6,7,8,9,10]  

  return (
    <div className="App">
      {openPopup && <Grid container justify="center" style={{marginTop: "10vh"}}>
        <Grid item className="popup">
              <Grid container>
                <Grid container justify="flex-end">
                <IconButton onClick={() => setOpenPopup(false)}>
                   <CloseIcon style={{fontSize: "3rem"}} /> 
                </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={4}>
                  <h2>Your Top Tracks</h2>
                  {topTracks.map((track) => (
                    
                      <div><Button style={{width: "100%", padding: 0}} onClick={() => playTracksByName(track.track_name)}><p style={{margin: "2%", textAlign: "left", paddingLeft: "10%"}}>{track.track_rank}{".  "}{track.track_name}</p></Button></div>
                  ))}
                  </Grid>
                  <Grid item xs={4}>
                  <h2>Your Top Artists</h2>
                  {topArtists.map((artist) => (
                    <p style={{margin: "2%", textAlign: "left", paddingLeft: "10%"}}>{artist.artist_rank}{".  "}{artist.artist_name}</p>
                  ))}
                  </Grid>
                  <Grid item xs={4}>
                  <h2>Your Top Genres</h2>
                  {topGenres.map((genre) => (
                    <p style={{margin: "2%", textAlign: "left", paddingLeft: "10%"}}>{genre.genre_rank}{".  "}{genre.genre_name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
                  ))}
                  </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12}>
                  
                  <Grid container style={{padding: "0.25rem"}}>
                    <Grid item xs={12}><b>Enter Changes Below:</b></Grid>
                    <Grid item xs={4}>
                      <Grid container style={{padding: "0.25rem"}}>
                      <Grid item xs={9}>
                      <Autocomplete
                          id="select-top-track"
                          options={findTrackRes}
                          getOptionLabel={(option) => option.track_name}
                          onChange={(e,v) => {if(v!=null) setNewTopTrack(v.track_id)}}
                          renderInput={(params) => <TextField {...params} onChange={findTracks}  label="Top Track" variant="outlined" />}
                        />
                      </Grid>
                        <Grid item xs={3}>
                          <Select variant="outlined" onChange={(e) => setTopTrackRank(e.target.value)}>
                            {rankings.map((rank) => (
                              <MenuItem value={rank}>{rank}</MenuItem>
                            ))}
                            
                          </Select>
                        </Grid>
                        </Grid>
                      </Grid>
                      
                      <Grid item xs={4}>
                        <Grid container style={{padding: "0.25rem"}}>
                        <Grid item xs={9}>
                          <Autocomplete
                              id="select-top-artist"
                              options={artistSearch}
                              getOptionLabel={(option) => option.artist_name}
                              onChange={(e,v) =>{if(v!=null) setNewTopArtist(v.artist_id)}}
                              renderInput={(params) => <TextField {...params}  onChange={searchArtists}   label="Top Artist" variant="outlined" />}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Select label="Rank" variant="outlined"  onChange={(e) => setTopArtistRank(e.target.value)}>
                              {rankings.map((rank) => (
                                <MenuItem value={rank}>{rank}</MenuItem>
                              ))}
                              
                            </Select>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <Grid container style={{padding: "0.25rem"}}>
                          <Grid item xs={9}>
                            <Autocomplete
                                id="select-top-genre"
                                options={genreSearch}
                                getOptionLabel={(option) => option.genre_name}
                                onChange={(e,v) =>{if(v!=null) setNewTopGenre(v.genre_id)}}
                                renderInput={(params) => <TextField {...params}  onChange={searchGenres}   label="Top Genre" variant="outlined" />}
                              />
                              </Grid>
                          <Grid item xs={3}>
                            <Select variant="outlined"  onChange={(e) => setTopGenreRank(e.target.value)}>
                              {rankings.map((rank) => (
                                <MenuItem value={rank}>{rank}</MenuItem>
                              ))}
                              
                            </Select>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                      <Grid item xs={12} >
                            <Button style={{backgroundColor: green[500], color: "white"}}onClick={submitChanges}>Update List</Button>
                          </Grid>
                      </Grid>
                </Grid>

              </Grid>
        </Grid>
      </Grid>}
      <ThemeProvider theme={theme}>
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, classes.appBarStyle, {
          [classes.appBarShift]: openMenu,
        })}
      >
        <Toolbar style={{backgroundColor: blueGrey[900]}}>
          <Grid container alignItems="center" spacing={3} justify='space-between'>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenMenu(!openMenu)}
            edge="start"
            className={clsx(classes.menuButton, classes.hide)}
          >
            { !openMenu 
              ? <ArrowForwardIosIcon style={{fontSize: "3rem"}} /> 
              : <ArrowBackIosIcon style={{fontSize: "3rem"}} /> }
          </IconButton>
          </Grid>
          <Grid item>
          
          <h1 className="title">
            SpotiFind
          </h1>
          </Grid>
          </Grid>
          </Grid>
          <Grid item>
          <IconButton onClick={openPopupMenu}><SettingsIcon style={{color: "white", fontSize: "3rem"}}/></IconButton>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} anchor="left" open={openMenu} variant="persistent" classes={{paper: classes.drawerPaper}} >
        <Grid container style={{padding: "1rem"}}>
        <Grid container
          direction="row"
          justify="start"
          alignItems="center"
          
         >

            <Grid item>
                <h2>Search Options</h2>
                </Grid>
            
        </Grid>
        <Grid container>
          <FormControl component="fieldset" color="green">
            <RadioGroup name="search" onChange={handleSearchCategory}>
            <FormControlLabel value="search" control={<Radio />} label="Search"/>
              {query[0] == "search" && 
              <input style={{width: "80%", background: "none", color: "white", outline: "none", border: "2px solid white", height: "2rem", padding: "0.5rem", fontSize: "1.5rem"}}className={classes.searchBar}onChange={(e)=>searchTracks(e.target.value)}/>}
            <FormControlLabel value="sound" control={<Radio />} label="My Acoustic Preferences"/>
              {query[0] == "sound" && <Grid container style={{paddingLeft: "1rem"}}>
                <FormControl component="fieldset">
                  <RadioGroup name="soundProp" onChange={handleSoundSearch}>
                  <FormControlLabel value="acousticness" control={<Radio/>} label="Acousticness"/>
                  <FormControlLabel value="popularity" control={<Radio/>} label="Popularity"/>
                  <FormControlLabel value="tempo" control={<Radio/>} label="Tempo"/>
                  <FormControlLabel value="danceability" control={<Radio/>} label="Danceability"/>
                  <FormControlLabel value="instrumentalness" control={<Radio/>} label="Instrumentalness"/>
                  
                  </RadioGroup>
                </FormControl>

              </Grid>}
              <FormControlLabel value="country" control={<Radio/>} label={"My Country (" + userInfo.country + ")"}/>
              <FormControlLabel value="top" control={<Radio/>} label="My Top Streamed"/>
              {query[0] == "top" && <Grid container style={{paddingLeft: "1rem"}}>
                <FormControl component="fieldset">
                <RadioGroup name="topProp" onChange={handleTopSearch}>
                  <FormControlLabel value="topTracks" control={<Radio/>} label="Top Tracks"/>
                  <FormControlLabel value="topArtists" control={<Radio/>} label="Top Artists"/>
                  <FormControlLabel value="topGenres" control={<Radio/>} label="Top Genres"/>
                 
                </RadioGroup>
              </FormControl>
              </Grid>
              }
            </RadioGroup>
          </FormControl>
          
        </Grid>
        </Grid>
      
      </Drawer>

      
    

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openMenu,
        })}
        
      >
      <Grid container justify="space-around">
        <Grid item xs={6}>
       
          
          <TrackList tracks={trackResult} playTracks={playTracks}/>
        </Grid>
        <Grid item xs={5}>
          {album != "" && <img src={album} className="thumbnail"/>}
        {token != null && <SpotifyPlayer syncExternalDevice={true} showSaveIcon={true} styles={{color: "none"}} callback={(state) => handleSpotifyState(state)}token={token} uris={uris} play={play}/>}
        </Grid>

      </Grid>
      </main>
      
      </ThemeProvider>
    </div>
  );
}

export default App;
