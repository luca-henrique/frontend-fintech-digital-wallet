import React, { useState, useRef, useEffect } from "react";
import Card from "../components/shared/Card";
import Globe from "react-globe.gl";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { Notification } from "../@types/types";

const initialPlaces = [
  {
    lat: -23.5505,
    lng: -46.6333,
    name: "São Paulo",
    street: "Av. Paulista, 1578",
    country: "Brasil",
  },
  {
    lat: 40.7128,
    lng: -74.006,
    name: "New York",
    street: "1 E 161st St, The Bronx",
    country: "USA",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    name: "Paris",
    street: "Champ de Mars, 5 Av. Anatole",
    country: "França",
  },
  {
    lat: 35.6895,
    lng: 139.6917,
    name: "Tokyo",
    street: "2 Chome-3-1 Asakusa, Taito City",
    country: "Japão",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    name: "Sydney",
    street: "Bennelong Point",
    country: "Austrália",
  },
];

import { useNotification } from "../context/NotificationContext";

const Location: React.FC = () => {
  const { addNotification } = useNotification();
  const globeRef = useRef<any>(null);
  const [placesData, setPlacesData] = useState(initialPlaces);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointClick = (point: any) => {
    setSelectedPlace(point);
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: point.lat, lng: point.lng, altitude: 0.5 },
        1000,
      );
    }
  };

  const handleConfirmAddress = () => {
    if (!address) return;
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);

      const parts = address.split(",").map((p) => p.trim());
      const street = parts[0] || address;
      const city = parts[1] || street;
      const country = parts[2] || "Localização Customizada";

      const newPlace = {
        // Simulate geocoding with random coordinates to represent the found location
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        name: city, // Use city for the main name/label
        street: street,
        country: country,
        isUserAdded: true, // Flag to differentiate color/size
      };

      setPlacesData((prevPlaces) => [...prevPlaces, newPlace]);
      setSelectedPlace(newPlace);

      if (globeRef.current) {
        globeRef.current.pointOfView(
          { lat: newPlace.lat, lng: newPlace.lng, altitude: 0.5 },
          1500,
        );
      }

      addNotification({
        type: "success",
        title: "Localização Adicionada!",
        message: `${address} foi marcado no globo.`,
      });
      setAddress("");
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">
        Localização Global
      </h1>
      <Card className="p-0 overflow-hidden relative" style={{ height: "65vh" }}>
        <div ref={containerRef} className="absolute inset-0">
          {dimensions.width > 0 && (
            <Globe
              ref={globeRef}
              width={dimensions.width}
              height={dimensions.height}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              pointsData={placesData}
              pointLat="lat"
              pointLng="lng"
              pointLabel="name"
              pointColor={(point: any) =>
                point.isUserAdded ? "#facc15" : "#06b6d4"
              } // yellow-400 for user points
              pointAltitude={0.01}
              pointRadius={(point: any) => (point.isUserAdded ? 0.35 : 0.25)}
              onPointClick={handlePointClick}
            />
          )}
        </div>

        {selectedPlace && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-10 transition-all duration-300">
            <Card className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-dark-text">
                  {selectedPlace.name}
                </h3>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="p-1 -mt-1 -mr-1 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-slate-600 dark:text-dark-text-secondary">
                <strong>País:</strong> {selectedPlace.country}
              </p>
              <p className="text-slate-600 dark:text-dark-text-secondary">
                <strong>Cidade:</strong> {selectedPlace.name}
              </p>
              <p className="text-slate-600 dark:text-dark-text-secondary">
                <strong>Endereço:</strong> {selectedPlace.street}
              </p>
            </Card>
          </div>
        )}
      </Card>

      <Card>
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-grow w-full">
            <Input
              label="Pesquisar Localização"
              id="address"
              placeholder="Endereço, Cidade, País"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isConfirming}
            />
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Button
              onClick={handleConfirmAddress}
              disabled={!address || isConfirming}
              className="w-full"
            >
              {isConfirming ? "Pesquisando..." : "Pesquisar e Adicionar"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Location;
