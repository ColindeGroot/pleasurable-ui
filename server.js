// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'
import fs from 'fs';
// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')


const showsResponse = await fetch('https://fdnd-agency.directus.app/items/mh_shows');
const showsResponseJSON = await showsResponse.json();

const showResponse = await fetch('https://fdnd-agency.directus.app/items/mh_show');
const showResponseJSON = await showResponse.json();

const uniqueAllUsersResponse = await fetch('https://fdnd-agency.directus.app/items/mh_users?groupBy=full_name');
const uniqueAllUsersResponseJSON = await uniqueAllUsersResponse.json();

const radiostationsResponse = await fetch('https://fdnd-agency.directus.app/items/mh_radiostations?sort=id');
const radiostationsResponseJSON = await radiostationsResponse.json();

const chatsResponse = await fetch('https://fdnd-agency.directus.app/items/mh_chats');
const chatsResponseJSON = await chatsResponse.json();

// Maak multi demsionele array aan met id van station en de naam
const radiostations = radiostationsResponseJSON.data.map(station => ({
  id: station.id,
  name: station.name
}));

app.get('/radio/:name/programmering{/:dayname}', async function (req, res) {
  const dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

  const thisWeekshows = [];
  let daysResponse;
  let dayID;
  if (req.params.dayname == undefined) {
      let todayDayNum = new Date().getDay();
      console.log('https://fdnd-agency.directus.app/items/mh_day?fields=*,shows.mh_shows_id.show&filter={"sort":"' + todayDayNum + '"}');
    daysResponse = await fetch('https://fdnd-agency.directus.app/items/mh_day?fields=*,shows.mh_shows_id.show&filter={"sort":"' + todayDayNum + '"}');
  }
  else {
    dayID = dayNames.findIndex(day => day === req.params.dayname);
    daysResponse = await fetch('https://fdnd-agency.directus.app/items/mh_day?fields=*,shows.mh_shows_id.show&filter={"sort":"' + dayID + '"}');
  }
  const daysResponseJSON = await daysResponse.json();

  daysResponseJSON.data.forEach(day => {
    const genDate = new Date(day.date);
    const dayofWeekJSON = genDate.getDay();
    const shows = day.shows;
    const showIDs = [];
    shows.forEach(show => {
      const show_id = show.mh_shows_id.show;
      showIDs.push(show_id);
    });
    thisWeekshows.push({
      day: dayofWeekJSON,
      dayName: dayNames[dayofWeekJSON],
      shows: showIDs,
      date: day.date
    });
  });
  const now = new Date()
  let startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 5)
  const thisWeek = [];

  // Chat GPT-3
  function getDatesOfCurrentWeek(refDate = new Date()) {

    const datesOfWeek = [];
    for (let i = 0; i < 8; i++) { // Loop through 8 days to include next Monday
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      console.log(date);
      datesOfWeek.push(date);
    }

    return datesOfWeek;
  }

  const datesOfCurrentWeek = getDatesOfCurrentWeek();
  datesOfCurrentWeek.forEach(date => {
    const dateString = date.toISOString().split('T')[0];
    thisWeek.push({
      day: dateString.split('-')[2],
      dayOfWeek: date.getDay()
    });
  });

  // End of Chat GPT code


  const stationArr = req.params.name;
  const stationURL = radiostations.find(station => station.name === stationArr);
  let stationID = stationURL.id;
  const ShowsforStationUL = "https://fdnd-agency.directus.app/items/mh_shows?fields=*.*.*.*,show.users.mh_users_id.cover.*";
  const showsforStationFilterPart = "&filter={\"show\":{\"radiostation\":{\"id\":\"" + stationID + "\"}}}&limit=-1";


  const showsforStation = await fetch(ShowsforStationUL + showsforStationFilterPart);
  const showsforStationJSON = await showsforStation.json();
  const nestedShows = [];

  showsforStationJSON.data.forEach(function (show) {

    nestedShows.push({
      ...show.show,
      from: show.from,
      until: show.until,
    });
  });
  nestedShows.sort((a, b) => new Date(a.from) - new Date(b.from));

  const updatedWeekShowsforStation = thisWeekshows.map(day => {
    const updatedShows = day.shows
      .filter(show => show !== undefined && show !== null) // Filter out null values before mapping
      .map(show => {

        // console.log("Processing show ID: " + show);
        let dayShowID = show;
        const showObj = nestedShows.find(s => s.id == dayShowID);
        return showObj;
      })
      .filter(show => show !== undefined && show !== null);// Hiermee map je als het door de array heen, en filter je de nulls eruit.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    updatedShows.sort((a, b) => a.from.localeCompare(b.from));
    return { ...day, shows: updatedShows };
  });
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  // Het feit dat ik een updated array moest maken met de spread operator heb ik van Chat. Ik snap wel dat het de day object pakt en de shows array updated met de juiste shows, maar had dit niet zelf bedacht. Ik snap nog niet helemaal hoe het werkt.

  let today;
  let todayName;
  if (req.params.dayname == undefined) {
    today = parseInt(thisWeekshows[0].day);  // Parse the day from thisWeekshows
    todayName = dayNames[today];
  } else {
    today = dayID;  // Parse the dayid from the request params

  }

  // console.log(updatedWeekShowsforStation);
  nestedShows.forEach(nestedShow => {
    updatedWeekShowsforStation.forEach(day => {
      const { date, day: dayNum, dayName } = day;

      const isInDay = day.shows.find(show => show.id === nestedShow.id);
      if (isInDay) {
        nestedShow.date = date;
        nestedShow.day = dayNum;
        nestedShow.dayName = dayName;
      }
    });
  });

  let bookmarkIds = [];
  const bookmarks = await fetch('https://fdnd-agency.directus.app/items/mh_messages?filter={"from":"1G"}')
  const bookmarksResponseJSON = await bookmarks.json();
  bookmarksResponseJSON.data.forEach(oneBookmark => {
    bookmarkIds.push(oneBookmark.for);
  });

  const bookmarkIdsNumber = bookmarkIds.map(id => parseInt(id));
  let bookmarkedShowObjects = nestedShows.filter(show =>
    bookmarkIdsNumber.includes(show.id)
  );
  //remove duplicate on book.liquid
  bookmarkedShowObjects = bookmarkedShowObjects.filter((show, index, self) =>
    index === self.findIndex(s => s.id === show.id)
  );

let hour = now.getHours();
hour = ("0" + hour).slice(-2); // zet een 0 voor de uren als nodig

let minute = now.getMinutes();

let time = hour + ":" + minute + ":00";

  function timeToSeconds(timeStr) { // Zodat een tijd van 00:00:00 niet nog niet geweest is volgens de kut code. nu is 00:00:00 gewoon int(0)
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
  const found = bookmarkedShowObjects.find((bookmarkedShowObject) => bookmarkedShowObject.from > time);
  const upcomingShow = bookmarkedShowObjects.find(bookmarkedShowObject => {
    if (timeToSeconds(time) < timeToSeconds(bookmarkedShowObject.from)){
      console.log(bookmarkedShowObject.name + "is nog niet geweest" + bookmarkedShowObject.from)
      return true; // first upcoming show
    }
    else{
      console.log(bookmarkedShowObject.name + "is al geweest" + bookmarkedShowObject.from)
      return false; // all passed shows
    }
  });
  console.log('First upcoming show:', upcomingShow);



  res.render('radio.liquid', {
    showsforStation: showsforStationJSON.data,
    stationNameGenerated: stationArr,
    stationNameGeneratedEncoded: encodeURIComponent(stationArr),
    thisWeek: thisWeek,
    dayNames: dayNames,
    thisWeekShows: updatedWeekShowsforStation,
    radiostations: radiostationsResponseJSON.data,
    thisstation: stationID,
    today: today,
    todayName: todayName,
    bookmarkedShows: bookmarkedShowObjects,
    upcomingShow: upcomingShow
  });
});


app.get('/', async function (req, res) {
  res.render('index.liquid', { radiostations: radiostationsResponseJSON.data })
})

// BOOKMARKS PAGINA
app.get('/bookmarks', async function (req, res) {

  const allShowsAllStations = "https://fdnd-agency.directus.app/items/mh_shows?fields=*.*.*.*,show.users.mh_users_id.cover.*&limit=-1";
  const allShowsAllStationsFetch = await fetch(allShowsAllStations);
  const allShowsAllStationsFetchJSON = await allShowsAllStationsFetch.json();
  const nestedShows = [];

  allShowsAllStationsFetchJSON.data.forEach(function (show) {

    nestedShows.push({
      ...show.show,
      from: show.from,
      until: show.until,
    });
  });
  nestedShows.sort((a, b) => new Date(a.from) - new Date(b.from));
  let bookmarkIds = [];
  const bookmarks = await fetch('https://fdnd-agency.directus.app/items/mh_messages?filter={"from":"1G"}')
  const bookmarksResponseJSON = await bookmarks.json();
  bookmarksResponseJSON.data.forEach(oneBookmark => {
    bookmarkIds.push(oneBookmark.for);
  });

  const bookmarkIdsNumber = bookmarkIds.map(id => parseInt(id));
  let bookmarkedShowObjects = nestedShows.filter(show =>
    bookmarkIdsNumber.includes(show.id)
  );
    bookmarkedShowObjects = bookmarkedShowObjects.filter((show, index, self) =>
    index === self.findIndex(s => s.id === show.id)
  );
  res.render('bookmarks.liquid', {
    bookmarkedShowObjects: bookmarkedShowObjects
  })
})


app.get('/testpage', async function (req, res) {
  res.render('testpage.liquid')
})


// Dylan. Kan jij checken of de route klopt en anders ff aanpassen? zelfde bij de delete please
app.post('/radio/:name/programmering/:id/bookmark', async (req, res) => {
  try {
    const directusResponse = await fetch('https://fdnd-agency.directus.app/items/mh_messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'bookmarked',
        for: req.params.id, //id van show die je wilt marken
        from: '1G',
      })
    });

    if (!directusResponse.ok) {
      throw new Error('Directus response error!!');
    }

    res.redirect(303, `/radio/${encodeURIComponent(req.params.name)}/programmering`);
  } catch (error) {
    console.error('Error saving bookmark:', error);
    res.status(500).send('Bookmark error');
  }
});



app.post('/radio/:name/programmering/:id/unmark', async (req, res) => {
  try {
    const markedResponse = await fetch(`https://fdnd-agency.directus.app/items/mh_messages?filter={"_and":[{"from": "1G"},{"for": ${req.params.id}}]}`); // filter op 1g en de id van e show die je wilt unmarken
    const markedJSON = await markedResponse.json();

    if (markedJSON.data.length > 0) {
      const markedId = markedJSON.data[0].id;
      // als de show al is gemarked word deze verwijderd en unmarked met een delete functie

      await fetch(`https://fdnd-agency.directus.app/items/mh_messages/${markedId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    }

    res.redirect(303, `/radio/${encodeURIComponent(req.params.name)}/programmering`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unmark failed!");
  }
});

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\nYippie`)
})