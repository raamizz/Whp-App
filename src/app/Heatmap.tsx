// import React, { useState, useRef, useEffect } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import HeatmapLayer from "react-leaflet-heatmap-layer";
// import "leaflet/dist/leaflet.css";
// import html2canvas from "html2canvas";

// const UserHeatMap = ({ width, height }) => {
//   const [points, setPoints] = useState([]);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const handleClick = (e) => {
//       const bounds = mapRef.current.getBoundingClientRect();
//       const x = e.clientX - bounds.left;
//       const y = e.clientY - bounds.top;
//       setPoints((prevPoints) => [...prevPoints, [y, x, 1]]);
//     };

//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, []);

//   const takeScreenshot = async () => {
//     if (mapRef.current) {
//       const canvas = await html2canvas(mapRef.current);
//       const image = canvas.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.href = image;
//       link.download = "user_heatmap_screenshot.png";
//       link.click();
//     }
//   };

//   return (
//     <div>
//       <div ref={mapRef} style={{ width, height }}>
//         <MapContainer
//           center={[height / 2, width / 2]}
//           zoom={2}
//           style={{ width, height }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <HeatmapLayer
//             points={points}
//             longitudeExtractor={(m) => m[1]}
//             latitudeExtractor={(m) => m[0]}
//             intensityExtractor={(m) => m[2]}
//             radius={20}
//             max={1}
//             minOpacity={0.1}
//           />
//         </MapContainer>
//       </div>
//       <button onClick={takeScreenshot}>Take Screenshot</button>
//     </div>
//   );
// };

// export default UserHeatMap;
