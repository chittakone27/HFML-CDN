import { useState, useRef, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, Marker, useMap, useMapEvents } from "react-leaflet";
import { pull } from "@/utils/fetch";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";
import useMetadataStore from "@/state/metadata";

const locationIconHtml = renderToString(<FontAwesomeIcon icon={faLocationDot} fontSize={25} color="#0277bd" />);
const locationIcon = new L.DivIcon({
  html: locationIconHtml,
  className: "dummy",
  iconSize: [19, 25],
  iconAnchor: [12.5, 28]
});

const MarkerEvent = ({ setMarker, accept }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      accept([lng, lat]);
      // setMarker({ latitude: lat, longitude: lng });
    }
  });
};

const GeoJsonLayer = ({ features }) => {
  const ref = useRef(null);
  const map = useMap();

  useEffect(() => {
    map.fitBounds(ref.current.getBounds());
  }, []);

  return <GeoJSON ref={ref} data={{ features }} style={{ color: "#4d4d4d", weight: 1, fill: false }} />;
};

const GeometryPicker = ({ value, accept, disabled }) => {
  const { t } = useTranslation();
  const [dialog, setDialog] = useState(false);
  const [marker, setMarker] = useState(null);
  const orgUnits = useMetadataStore((state) => state.orgUnits);
  let features;
  const foundLevel1OrgUnit = orgUnits.find((ou) => ou.level === 1);
  features = foundLevel1OrgUnit.geoJson.features;

  useEffect(() => {
    if (value) {
      setMarker({
        latitude: value[1] || "",
        longitude: value[0] || ""
      });
    } else {
      setMarker({
        latitude: "",
        longitude: ""
      });
    }
  }, [value]);

  return (
    <div>
      <div className="geometry-picker-container">
        <div>
          <Input
            disabled={disabled}
            label={t("longitude")}
            valueType="TEXT-COORDINATES"
            value={marker ? marker.longitude : ""}
            change={(value) => {
              const newMarker = { ...marker, longitude: value };
              setMarker(newMarker);
              if (newMarker.longitude && newMarker.latitude) {
                accept([newMarker.longitude, newMarker.latitude]);
              }
            }}
          />
        </div>
        <div>
          <Input
            disabled={disabled}
            label={t("latitude")}
            valueType="TEXT-COORDINATES"
            value={marker ? marker.latitude : ""}
            change={(value) => {
              const newMarker = { ...marker, latitude: value };
              setMarker(newMarker);
              if (newMarker.longitude && newMarker.latitude) {
                accept([newMarker.longitude, newMarker.latitude]);
              }
            }}
          />
        </div>
        <ButtonGroup variant="contained" style={{ marginTop: 5 }}>
          <Button
            disabled={disabled}
            endIcon={<FontAwesomeIcon icon={faLocationDot} />}
            onClick={() => {
              setDialog(true);
            }}
          >
            {t("map")}
          </Button>
          <Button
            disabled={disabled}
            color="error"
            endIcon={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => {
              accept("");
            }}
          >
            {t("clear")}
          </Button>
        </ButtonGroup>
      </div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={dialog}
        onClose={(event, reason) => {
          if (reason === "escapeKeyDown" || reason === "backdropClick") {
            return;
          } else {
            setDialog(false);
          }
        }}
      >
        <DialogTitle>{t("map")}</DialogTitle>
        <DialogContent>
          <div className="geometry-picker-map-container">
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
              />
              <GeoJsonLayer features={features} />
              <MarkerEvent setMarker={setMarker} accept={accept} />
              {marker && marker.longitude && marker.latitude && <Marker position={[marker.latitude, marker.longitude]} icon={locationIcon}></Marker>}
            </MapContainer>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button
            variant="contained"
            onClick={() => {
              setDialog(false);
            }}
          >
            {t("ok")}
          </Button> */}
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setDialog(false);
            }}
          >
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GeometryPicker;
