// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import React, { useContext } from "react";
import * as _ from "underscore";
import Tool from "./Tool";
import { modelInputProps } from "./helpers/Interfaces";
import AppContext from "./hooks/createContext";

const Stage = () => {
  const {
    clicks: [, setClicks],
    image: [image],
  } = useContext(AppContext)!;

  const getClick = (x: number, y: number): modelInputProps => {
    console.log(x,y);
    
    const clickType = 1;
    return { x, y, clickType };
  };

  // Obtener la posición del mouse y escalar las coordenadas (x, y) de vuelta a lo natural
  // escala de la imagen. Actualice el estado de los clics con setClicks to trigger
  // el modelo ONNX para ejecutar y generar una nueva máscara a través de useEffect en App.tsx
  const handleMouseMove = _.throttle((e: any) => {
    console.log('ok');
    
    let el = e.nativeEvent.target;
    const rect = el.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    const imageScale = image ? image.width / el.offsetWidth : 1;
    x *= imageScale;
    y *= imageScale;
    const click = getClick(x, y);
    if (click) setClicks([click]);
  }, 15);

  const flexCenterClasses = "flex items-center justify-center";
  return (
    <div className={`w-full h-full ${flexCenterClasses}`}>
      <div className={`${flexCenterClasses} relative w-[90%] h-[90%]`}>
        <Tool handleMouseMove={handleMouseMove} />
      </div>
    </div>
  );
};

export default Stage;
