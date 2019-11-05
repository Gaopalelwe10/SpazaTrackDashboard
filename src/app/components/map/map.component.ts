import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { SpazaService } from 'src/app/services/spaza.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: any;
  geocoder: any;
  spazalist;
  spazaload;

  startPosition: any;
  originPosition: string;
  destinationPosition: string;
posLat;
posLng;
  start;
  geojson : any = {};
  OBJ ;
  tempDur;
  distance;
  duration;
  steps : any = [];
  text;
  isDirection : boolean = false;

  finalDuration;
  finalDistance;
  constructor(
    private http : HttpClient,
    private spazaService : SpazaService
    // public geolocation: Geolocation
    ){ 
    spazaService.getSpazasMap().subscribe((data) => {
      this.spazalist = data;
      this.spazaload = data;
      console.log( data)
    })

    if (navigator.geolocation) {
      // 🗺️ yep, we can proceed!
      console.log("success geolocation")
      navigator.geolocation.getCurrentPosition(pos => {
        this.posLng = pos.coords.longitude;
        this.posLat = pos.coords.latitude
        console.log(this.posLng)
        console.log(this.posLat)
            const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(assets/img/icon.jpg)';
        el.style.width = '40px';
        el.style.height = '40px';

        // var marker = new mapboxgl.Marker(el)
        //   .setLngLat([pos.coords.longitude, pos.coords.latitude])
        //   // .setPopup(new mapboxgl.Popup({ offset: 25 })
        //   //   .setHTML('<p>' + this.startPosition.Address + '</p> '))
        //   .addTo(this.map);
      });
    } else {
      // no can do
      console.log("fail geolocation")
    }
    
  }
  jotPip(xx){
   
    var coords = xx.intersections[0].location;
    console.log(coords)
    this.map.flyTo({
      center : [coords[0],coords[1]],
      zoom : 15
    });

    const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(assets/img/spotShop.png)';
        el.style.width = '40px';
        el.style.height = '40px';

        // var marker = new mapboxgl.Marker(el)
        // .setLngLat([xx.lng, xx.lat])
        // // .setPopup(new mapboxgl.Popup({ offset: 25 })
        // //   .setHTML('<p>' + this.startPosition.Address + '</p> '))
        // .addTo(this.map);
        
        
        var end = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }
        ]
      };
      if (this.map.getLayer('end')) {
        this.map.getSource('end').setData(end);
      } else {
        this.map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords
                }
              }]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': 'rgb(20, 204, 250)'
          }
        });
      }
  
  }

  ngOnInit() {
    this.initializeMapBox();
   
  }
  ionViewDidEnter() {
    this.initializeItems();
  }
  initializeItems(): void {
    this.spazalist = this.spazaload;
  }
  try(){
console.log("**")
  }
  initializeMapBox() {
    // or "const mapboxgl = require('mapbox-gl');"
    mapboxgl.accessToken = 'pk.eyJ1Ijoibm51bnUiLCJhIjoiY2p4cTIxazB3MG0wYTNncm4wanF0cDVjaiJ9.v0khvZZss9z_U2MroA2PVQ';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 10,
      // center: [lng, lat],
      center: [28.218370, -25.731340]
    });

    this.geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: {
        color: 'orange'
      },
      position : 'top-right',
      placeholder: 'Search for places ', // Placeholder text for the search bar
      // Coordinates of UC Berkeley
    });


    this.map.addControl(this.geocoder);
    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl());


    // load coodinates from database
    this.spazaService.getSpazasMap().subscribe((markers: any) => {
      markers.forEach(element => {

        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(assets/img/icons8.png)';
        el.style.width = '40px';
        el.style.height = '40px';

        console.log(element.lng, element.lat)
        var marker = new mapboxgl.Marker(el)
          .setLngLat([element.lng, element.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<p>' + element.Address + '</p> <p>Spaza Name: ' + element.spazaName + '</p>'))
          .addTo(this.map);
      });
    })


  }

  getRoute(xx) {

    this.map.flyTo({
      center : [xx.lng,xx.lat],
      zoom : 15
    });
    var end = [xx.lng,xx.lat];
   
    // make a directions request using cycling profile
    
    // only the end or destination will change
    
    // an arbitrary start will always be the same
    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + this.posLng + ',' + this.posLat + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + 'pk.eyJ1Ijoibm51bnUiLCJhIjoiY2p4cTIxazB3MG0wYTNncm4wanF0cDVjaiJ9.v0khvZZss9z_U2MroA2PVQ';
  
  
    var req = this.http.get(url).subscribe((response) => {
      this.OBJ = response;
      
      this.tempDur = this.OBJ.routes[0].legs[0];
      this.distance = this.OBJ.routes[0].legs[0].distance;
      this.duration = this.OBJ.routes[0].legs[0].duration;
      this.steps = this.OBJ.routes[0].legs[0].steps;
      this.finalDuration =(this.tempDur.duration / 60).toFixed(2);
    this.finalDistance =(this.tempDur.distance / 1000).toFixed(2);
      console.log( this.finalDistance  + " KM");
      console.log( this.finalDistance + " Mins");
      console.log(this.steps);
      console.log(response)
      var data = this.OBJ.routes[0];
      var route = data.geometry.coordinates;
      console.log(route);
      console.log(this.OBJ);
      this.geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          };
    });
    
 
    if (navigator.geolocation) {
      // 🗺️ yep, we can proceed!
      console.log("success geolocation")
      navigator.geolocation.getCurrentPosition(pos => {
        
        console.log(pos.coords.latitude)
        console.log(pos.coords.longitude)
            const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(assets/img/icon.jpg)';
        el.style.width = '40px';
        el.style.height = '40px';

        var marker = new mapboxgl.Marker(el)
          .setLngLat([pos.coords.longitude, pos.coords.latitude])
          .addTo(this.map);
      });
    } else {
      // no can do
      console.log("fail geolocation")
    }
  
    // // if the route already exists on the map, reset it using setData
  
  
      if (this.map.getSource('route')) {
        this.map.getSource('route').setData(this.geojson);
      } else { // otherwise, make a new request
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: this.geojson
              }
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      
        this.isDirection = true;
      }
  
  //     // add turn instructions here at the end
  
  //     // get the sidebar and add the instructions
  // var instructions = document.getElementById('instructions');
  
  
  // var tripInstructions = [];
  // for (var i = 0; i < this.steps.length; i++) {
  //  console.log(i + " -- " + this.steps[i].maneuver.instruction) ;
  //   // instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(this.OBJ.duration / 60) + ' min 🚴 </span>' + tripInstructions;
  // }
  // this.text = tripInstructions;
  
  //   };


  }
}
