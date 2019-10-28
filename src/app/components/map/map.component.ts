import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { SpazaService } from 'src/app/services/spaza.service';
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
  constructor(private spazaService : SpazaService) { }

  ngOnInit() {
    this.initializeMapBox()
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
      placeholder: 'Search for places ', // Placeholder text for the search bar
      // Coordinates of UC Berkeley
    });


    this.map.addControl(this.geocoder);

    // this.geocoder.on('result', (ev) => {
    //   console.log(ev.result.text)
    //   this.value = ev.result.text;
    //   this.search(ev.result.text)
    //   console.log("valu ll" + this.value)
    //   console.log("me")
    //   // map.getSource('single-point').setData(ev.result.geometry);

    // });

    // this.geolocation.getCurrentPosition()
    //   .then((response) => {

    //     this.startPosition = response.coords;
    //     // this.originPosition= response.Address;
    //     this.map.setCenter([this.startPosition.longitude, this.startPosition.latitude]);

    //     var marker = new mapboxgl.Marker()
    //       .setLngLat([this.startPosition.longitude, this.startPosition.latitude])
    //       // .setPopup(new mapboxgl.Popup({ offset: 25 })
    //       //   .setHTML('<p>' + this.startPosition.Address + '</p> '))
    //       .addTo(this.map);
    //   })


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
}