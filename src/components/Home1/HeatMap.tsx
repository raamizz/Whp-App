// // src/components/HeatmapComponent.js

// import React, { useEffect, useRef } from 'react';
// import h337 from "heatmap.js"

// interface Props{
//     data:any;
// }
// const HeatmapComponent:React.FC<Props> = ({ data }) => {
//   const heatmapContainer = useRef(null);

//   useEffect(() => {
//     if (!heatmapContainer.current) return;

//     // Create heatmap instance
//     const heatmapInstance:any = h337.create({
//       container: heatmapContainer.current,
//     });

//     // Set the heatmap data
//     heatmapInstance.setData({
//       max: 100,
//       data: data,
//     });

//   }, [data]);

//   return (
//     <div
//       ref={heatmapContainer}
//       style={{
//         width: '100%',
//         height: '100%',
//       }}
//     />
//   );
// };

// export default HeatmapComponent;
