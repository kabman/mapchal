import React from 'react';
import GoogleMapReact from 'google-map-react';
import useStyles from './styles'

const Map = ({coords,setCoords}) =>{
    const classes = useStyles();
    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:'AIzaSyCwElc0YfvcU7PeAz40jX9p1va0CPBpJrc'}}
                defaultCenter={coords}
                center={coords}
                defaultZoom={14}
                margin={[50,50,50,50]}
                onChange={(e) => {
                    setCoords({ lat: e.center.lat, lng: e.center.lng });
                  }}
            >
            </GoogleMapReact>
        </div>
    );
}

export default Map;