import React, {useState} from 'react';
import {Stage, Layer, Text} from 'react-konva';
import Konva from "konva";

type Player = {
  isDragging: boolean;
  x: number;
  y: number;
}
const TextSpan: React.FC<{
  player: Player,
  onDragStart: () => void,
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void
}> = ({player, onDragStart, onDragEnd}) => {
  return (
    <Text
      text="Draggable Text"
      x={player.x}
      y={player.y}
      draggable
      fill={player.isDragging ? "green" : "black"}
      onDragStart={() => {
        onDragStart();
      }}
      onDragEnd={(e) => {
        onDragEnd(e);
      }}
    />
  );
}

const Drag: React.FC = () => {
  const [player, setPlayer] = useState({
    isDragging: false,
    x: 50,
    y: 50,
  })

  const onDragStart = () => {
    setPlayer({
      ...player,
      isDragging: true,
    });
  };

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setPlayer({
      isDragging: false,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  return (
    <div style={{width: 1050, height: 580}}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <TextSpan
            player={player}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Drag;
