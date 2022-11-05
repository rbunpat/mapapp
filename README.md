
# MapApp
Arduino/ESP32 GPS Tracking Map built with Node.js, Express.js, some code from StackOverflow and of course, Ultimate Jank™
It just writes to a file when a post request is recieved. No validation whatsoever.
## Installation and Running

```bash
  npm install
  npm start
```
## "API" Reference

#### Get the latest coordinates

```
  GET /getPos
```

#### Save Coordinates
Just send it as plain text

```
  POST /savePos
```

##### Body

```
(newline because i'm too lazy to make auto new line and this is very jank)
lat, lon
```
##### Example

```

37.621263, -122.378787
```
