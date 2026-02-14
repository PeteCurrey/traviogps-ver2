import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { Property } from "@/types/property";
import { cn } from "@/lib/utils";

// Fix default marker icons
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Fallback coordinates based on location keywords
const getCoordinatesForProperty = (property: Property): [number, number] | null => {
  // If property has coordinates, use them
  if (property.coordinates) {
    return [property.coordinates.lat, property.coordinates.lng];
  }

  // Fallback: determine coordinates based on location/area keywords
  const location = `${property.location} ${property.address.area} ${property.address.city}`.toLowerCase();
  
  if (location.includes("baslow")) return [53.2355, -1.6156];
  if (location.includes("bakewell")) return [53.2166, -1.6761];
  if (location.includes("brampton") || (location.includes("chesterfield") && !location.includes("walton"))) return [53.2358, -1.4537];
  if (location.includes("hathersage")) return [53.3313, -1.6506];
  if (location.includes("ecclesall")) return [53.3667, -1.4988];
  if (location.includes("mapperley")) return [52.9776, -1.1359];
  if (location.includes("matlock")) return [53.1394, -1.5555];
  if (location.includes("sheffield") && location.includes("city")) return [53.3839, -1.4668];
  if (location.includes("sheffield")) return [53.3811, -1.4701];
  if (location.includes("dronfield")) return [53.2952, -1.4677];
  if (location.includes("lace market") || location.includes("nottingham")) return [52.9521, -1.1455];
  if (location.includes("walton")) return [53.2251, -1.4282];
  if (location.includes("peak district")) return [53.25, -1.55];
  
  // Default to Peak District center if no match
  return [53.25, -1.55];
};

// Custom marker icon
const createPropertyIcon = (property: Property) => {
  const isRental = property.listingType === "rent";
  const price = property.listingType === "rent" 
    ? `£${property.price.toLocaleString()}` 
    : `£${(property.price / 1000).toFixed(0)}k`;
  
  return L.divIcon({
    className: "custom-property-marker",
    html: `
      <div class="marker-container ${isRental ? "rental" : "sale"} ${property.status !== "available" ? "unavailable" : ""}">
        <div class="marker-price">${price}</div>
        <div class="marker-arrow"></div>
      </div>
    `,
    iconSize: [80, 40],
    iconAnchor: [40, 40],
  });
};

interface PropertyMapProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  onBoundsChange?: (properties: Property[]) => void;
  onDrawComplete?: (properties: Property[]) => void;
  selectedPropertyId?: string;
  className?: string;
}

export function PropertyMap({
  properties,
  onPropertySelect,
  onBoundsChange,
  onDrawComplete,
  selectedPropertyId,
  className,
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.MarkerClusterGroup | null>(null);
  const drawLayerRef = useRef<L.FeatureGroup | null>(null);
  const propertiesRef = useRef<Property[]>(properties);
  const onDrawCompleteRef = useRef(onDrawComplete);
  const [isMapReady, setIsMapReady] = useState(false);

  // Keep refs updated
  useEffect(() => {
    propertiesRef.current = properties;
  }, [properties]);

  useEffect(() => {
    onDrawCompleteRef.current = onDrawComplete;
  }, [onDrawComplete]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map centered on Peak District
    const map = L.map(mapRef.current, {
      center: [53.25, -1.55],
      zoom: 10,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    // Add custom zoom control position
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Add tile layer - using CartoDB Voyager for premium look
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    // Create marker cluster group
    const markers = L.markerClusterGroup({
      chunkedLoading: true,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 50,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        let size = "small";
        if (count > 10) size = "medium";
        if (count > 50) size = "large";
        
        return L.divIcon({
          html: `<div class="cluster-marker cluster-${size}"><span>${count}</span></div>`,
          className: "custom-cluster-icon",
          iconSize: L.point(44, 44),
        });
      },
    });

    map.addLayer(markers);
    markersRef.current = markers;

    // Create draw layer
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawLayerRef.current = drawnItems;

    // Add draw control
    const drawControl = new L.Control.Draw({
      position: "topleft",
      draw: {
        polygon: {
          allowIntersection: false,
          shapeOptions: {
            color: "hsl(33, 100%, 40%)",
            fillColor: "hsl(33, 100%, 40%)",
            fillOpacity: 0.1,
            weight: 2,
          },
        },
        rectangle: {
          shapeOptions: {
            color: "hsl(33, 100%, 40%)",
            fillColor: "hsl(33, 100%, 40%)",
            fillOpacity: 0.1,
            weight: 2,
          },
        },
        circle: {
          shapeOptions: {
            color: "hsl(33, 100%, 40%)",
            fillColor: "hsl(33, 100%, 40%)",
            fillOpacity: 0.1,
            weight: 2,
          },
        },
        polyline: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
    map.addControl(drawControl);

    // Handle draw events
    map.on(L.Draw.Event.CREATED, (e: L.LeafletEvent) => {
      const event = e as L.DrawEvents.Created;
      const layer = event.layer;
      drawnItems.clearLayers();
      drawnItems.addLayer(layer);

      // Find properties within drawn area using current properties from ref
      const currentProperties = propertiesRef.current;
      const drawnShape = layer;
      
      const propertiesInArea = currentProperties.filter((property) => {
        const coords = getCoordinatesForProperty(property);
        if (!coords) return false;
        const point = L.latLng(coords[0], coords[1]);
        
        if (drawnShape instanceof L.Circle) {
          return point.distanceTo(drawnShape.getLatLng()) <= drawnShape.getRadius();
        } else if (drawnShape instanceof L.Polygon || drawnShape instanceof L.Rectangle) {
          // Use ray casting for polygon containment
          const bounds = (drawnShape as L.Polygon).getBounds();
          if (!bounds.contains(point)) return false;
          
          // For rectangles, bounds check is sufficient
          if (drawnShape instanceof L.Rectangle) return true;
          
          // For polygons, do proper containment check
          const latLngs = (drawnShape as L.Polygon).getLatLngs()[0] as L.LatLng[];
          return isPointInPolygon(point, latLngs);
        }
        return false;
      });

      onDrawCompleteRef.current?.(propertiesInArea);
    });

    map.on(L.Draw.Event.DELETED, () => {
      onDrawCompleteRef.current?.(propertiesRef.current);
    });

    // Handle bounds change for filtering
    map.on("moveend", () => {
      const bounds = map.getBounds();
      const currentProperties = propertiesRef.current;
      const visibleProperties = currentProperties.filter((property) => {
        const coords = getCoordinatesForProperty(property);
        if (!coords) return false;
        return bounds.contains(L.latLng(coords[0], coords[1]));
      });
      onBoundsChange?.(visibleProperties);
    });

    mapInstanceRef.current = map;
    setIsMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      setIsMapReady(false);
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (!isMapReady || !markersRef.current) return;

    const markers = markersRef.current;
    markers.clearLayers();

    properties.forEach((property) => {
      const coords = getCoordinatesForProperty(property);
      if (!coords) return;

      const marker = L.marker(coords, {
        icon: createPropertyIcon(property),
      });

      marker.on("click", () => {
        onPropertySelect?.(property);
      });

      // Popup with property info
      const imageUrl = property.images?.[0] || '/placeholder.svg';
      marker.bindPopup(`
        <div class="property-popup">
          <img src="${imageUrl}" alt="${property.title}" class="popup-image" onerror="this.src='/placeholder.svg'" />
          <div class="popup-content">
            <h3 class="popup-title">${property.title}</h3>
            <p class="popup-location">${property.location}</p>
            <p class="popup-price">${property.priceFormatted}${property.priceLabel ? ` ${property.priceLabel}` : ""}</p>
            <div class="popup-details">
              <span>${property.bedrooms} bed</span>
              <span>${property.bathrooms} bath</span>
              ${property.sqft ? `<span>${property.sqft.toLocaleString()} sqft</span>` : ""}
            </div>
          </div>
        </div>
      `, {
        maxWidth: 280,
        className: "premium-popup",
      });

      markers.addLayer(marker);
    });

    // Fit bounds to show all markers
    if (properties.length > 0 && markers.getLayers().length > 0) {
      const bounds = markers.getBounds();
      if (bounds.isValid()) {
        mapInstanceRef.current?.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [properties, isMapReady, onPropertySelect]);

  // Handle selected property
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !selectedPropertyId) return;

    const selectedProperty = properties.find(p => p.id === selectedPropertyId);
    if (selectedProperty) {
      const coords = getCoordinatesForProperty(selectedProperty);
      if (coords) {
        mapInstanceRef.current.setView(coords, 14, { animate: true });
      }
    }
  }, [selectedPropertyId, isMapReady, properties]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div ref={mapRef} className="absolute inset-0 z-0" />
      <style>{`
        .custom-property-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .marker-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        
        .marker-container:hover {
          transform: scale(1.1);
          z-index: 1000 !important;
        }
        
        .marker-price {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          border: 2px solid hsl(var(--accent));
        }
        
        .marker-container.rental .marker-price {
          border-color: hsl(210, 80%, 50%);
        }
        
        .marker-container.unavailable .marker-price {
          opacity: 0.6;
          border-color: hsl(var(--muted-foreground));
        }
        
        .marker-arrow {
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid hsl(var(--accent));
          margin-top: -1px;
        }
        
        .marker-container.rental .marker-arrow {
          border-top-color: hsl(210, 80%, 50%);
        }
        
        .marker-container.unavailable .marker-arrow {
          border-top-color: hsl(var(--muted-foreground));
        }
        
        .cluster-marker {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border: 3px solid hsl(var(--background));
        }
        
        .cluster-small {
          width: 36px;
          height: 36px;
          font-size: 13px;
        }
        
        .cluster-medium {
          width: 44px;
          height: 44px;
          font-size: 14px;
        }
        
        .cluster-large {
          width: 52px;
          height: 52px;
          font-size: 15px;
        }
        
        .custom-cluster-icon {
          background: transparent !important;
        }
        
        .premium-popup .leaflet-popup-content-wrapper {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          border-radius: 8px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }
        
        .premium-popup .leaflet-popup-content {
          margin: 0;
        }
        
        .premium-popup .leaflet-popup-tip {
          background: hsl(var(--background));
        }
        
        .property-popup {
          min-width: 240px;
        }
        
        .popup-image {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }
        
        .popup-content {
          padding: 12px 16px;
        }
        
        .popup-title {
          font-family: var(--font-serif), serif;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px;
          color: hsl(var(--foreground));
        }
        
        .popup-location {
          font-size: 13px;
          color: hsl(var(--muted-foreground));
          margin: 0 0 8px;
        }
        
        .popup-price {
          font-size: 18px;
          font-weight: 700;
          color: hsl(var(--accent));
          margin: 0 0 8px;
        }
        
        .popup-details {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: hsl(var(--muted-foreground));
        }
        
        .popup-details span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        /* Leaflet Draw custom styles */
        .leaflet-draw-toolbar a {
          background-color: hsl(var(--background)) !important;
          border-color: hsl(var(--border)) !important;
        }
        
        .leaflet-draw-toolbar a:hover {
          background-color: hsl(var(--accent)) !important;
        }
        
        .leaflet-draw-actions a {
          background-color: hsl(var(--accent)) !important;
          color: hsl(var(--accent-foreground)) !important;
        }
        
        .leaflet-control-zoom a {
          background-color: hsl(var(--background)) !important;
          color: hsl(var(--foreground)) !important;
          border-color: hsl(var(--border)) !important;
        }
        
        .leaflet-control-zoom a:hover {
          background-color: hsl(var(--muted)) !important;
        }
        
        .leaflet-control-attribution {
          background: hsl(var(--background) / 0.8) !important;
          color: hsl(var(--muted-foreground)) !important;
          font-size: 10px;
        }
        
        .leaflet-control-attribution a {
          color: hsl(var(--accent)) !important;
        }
      `}</style>
    </div>
  );
}

// Helper function for point-in-polygon test
function isPointInPolygon(point: L.LatLng, polygon: L.LatLng[]): boolean {
  let inside = false;
  const x = point.lng, y = point.lat;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng, yi = polygon[i].lat;
    const xj = polygon[j].lng, yj = polygon[j].lat;
    
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
}
