import { useState, useRef, useEffect, memo } from "react";
import { renderToString } from "react-dom/server";
import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { pull } from "@/utils/fetch";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";
import useMetadataStore from "@/state/metadata";

const locationIconHtml = renderToString(
  <FontAwesomeIcon icon={faLocationDot} fontSize={25} color="#0277bd" />
);
const locationIcon = new L.DivIcon({
  html: locationIconHtml,
  className: "dummy",
  iconSize: [19, 25],
  iconAnchor: [12.5, 28],
});

const MarkerEvent = ({ setMarker }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setMarker({ latitude: lat, longitude: lng });
    },
  });
};

const GeoJsonLayer = ({ features }) => {
  const ref = useRef(null);
  const map = useMap();
  useEffect(() => {
    map.fitBounds(ref.current.getBounds());
  }, []);

  return (
    <GeoJSON
      ref={ref}
      data={{ features }}
      style={{ color: "#4d4d4d", weight: 1, fill: false }}
    />
  );
};

const GeometryPicker = () => {
  const { t } = useTranslation();
  const [dialog, setDialog] = useState(false);
  const [marker, setMarker] = useState(null);
  const { currentEvent, actions, completeness } = useEventCaptureStore(
    (state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions,
      completeness: state.completeness,
    }),
    shallow
  );
  const orgUnits = useMetadataStore((state) => state.orgUnits);
  const level1OrgUnit = orgUnits.find((ou) => ou.level === 1);
  const { setCurrentEventGeometry } = actions;
  const geometry = currentEvent.geometry;
  const isDataSetCompleted = completeness ? true : false;

  useEffect(
    () => {
      console.log("geometry rerender", geometry);

      if (geometry) {
        setMarker({
          latitude: currentEvent.geometry.coordinates[1],
          longitude: currentEvent.geometry.coordinates[0],
        });
      }
    },
    geometry ? [geometry.coordinates[0], geometry.coordinates[1]] : [null]
  );
  // useEffect(() => {
  //   console.log("marker", marker);
  // }, [JSON.stringify(marker)]);
  return (
    <div className="input-field-container">
      <div className="geometry-picker-inputs">
        <div>
          <Input
            label={t("longitude")}
            valueType="TEXT-COORDINATES"
            value={marker ? marker.longitude : ""}
            change={(value) =>
              setCurrentEventGeometry(marker?.latitude || "", value)
            }
          />
        </div>
        <div>
          <Input
            label={t("latitude")}
            valueType="TEXT-COORDINATES"
            value={marker ? marker.latitude : ""}
            change={(value) =>
              setCurrentEventGeometry(value, marker?.longitude || "")
            }
          />
        </div>
        <ButtonGroup variant="contained">
          <Button
            disabled={currentEvent.status !== "ACTIVE" || isDataSetCompleted}
            endIcon={<FontAwesomeIcon icon={faLocationDot} />}
            onClick={() => {
              setDialog(true);
            }}
          >
            {t("map")}
          </Button>
          <Button
            color="error"
            disabled={currentEvent.status !== "ACTIVE" || isDataSetCompleted}
            endIcon={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => {
              setCurrentEventGeometry("", "");
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
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
              />
              <GeoJsonLayer features={level1OrgUnit.geoJson.features} />
              <MarkerEvent setMarker={setMarker} />
              {marker && (
                <Marker
                  position={[marker.latitude, marker.longitude]}
                  icon={locationIcon}
                ></Marker>
              )}
            </MapContainer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentEventGeometry(marker.latitude, marker.longitude);
              setDialog(false);
            }}
          >
            {t("ok")}
          </Button>
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

export default memo(GeometryPicker);
