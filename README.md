
# MapApp
Arduino/ESP32 GPS Tracking Map built with Node.js, Express.js, some code from StackOverflow and of course, Ultimate Jank™
## Running
Just download the file from release, extract it and run it

## "API" Reference

#### Get the latest coordinates

```
  GET /data
```

#### Save Coordinates
Just send it as plain text

```
  POST /savePos
```

##### Body

```
{
    "latitude": 69,
    "longitude": -420
}

```
##### Example

```
{
    "latitude": 69,
    "longitude": -420
}

```
