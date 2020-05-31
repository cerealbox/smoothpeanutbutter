import React, { Suspense, lazy } from 'react'
import './App.css'
import assert from 'assert'

function getPosition(): Promise<{lat:number, lng:number}> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(o => {
      assert(o != null)
      resolve({lat: o.coords.latitude, lng: o.coords.longitude})
    })
  })
}

// madness:
function resource<T>(f: () => Promise<T>): () => T {
  let value: T | null = null
  return () => {
    if (value === null) 
      throw f().then(v => value = v).then(v => v)
    else
      return value
  }
}

const fetchRestaurants = resource(
  async function fetchRestaurants():Promise<{name:string, mapurl:string, lat:number, lng:number}[]> {
    // const recordPattern = /<section class="c-mapstack__card.+?<span class="c-mapstack__card-index">.+?<\/span>(?<name>.+?)<\/h1>.+?<li><a href="(?<mapurl>https:\/\/www.google.com\/maps\/search\/.+?\/(?<lat>[0-9-.]+?),(?<lng>[0-9-.]+?))"/gis
    // const url = "https://www.eater.com/maps/best-new-restaurants-toronto-heatmap"
    // // https://159.203.25.161:8080/${url}
    // const text = await (await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
    //   "headers": {
    //     "accept": "*/*",
    //     "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "cross-site"
    //   },
    //   "referrerPolicy": "no-referrer-when-downgrade",
    //   "body": null,
    //   "method": "GET",
    //   "mode": "cors",
    //   "credentials": "omit"
    // })).text()
    // return [...text.matchAll(recordPattern)].map(({groups}) => {
    //   assert(groups != null)
    //   const {name, mapurl, lat, lng} = groups
    //   assert(typeof name == "string")
    //   assert(typeof mapurl == "string")
    //   return {name, mapurl, lat: parseFloat(lat), lng: parseFloat(lng)}
    // })

    return [{name: "1", mapurl: "", lat: 1, lng: 1}, {name: "2", mapurl: "", lat: 0, lng: 0}]
  }
)

const Restaurants = () => <ul>{ fetchRestaurants().map(({name, mapurl, lat, lng}) => <li>{name}</li>) }</ul>

function App() {

  return (
    <Suspense fallback={<h2>loading...</h2>}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Restaurants /> 
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Suspense>
  );
}

export default App;
