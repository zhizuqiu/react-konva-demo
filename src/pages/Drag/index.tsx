import React, {useState,useEffect} from 'react';
import {Stage, Layer, Text} from 'react-konva';
import Konva from "konva";
import LocalStorage from "@/pages/Drag/localstorage";
import {Player} from "@/pages/Drag/Player";
import {Button} from "antd"


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

  const playerLocalStorage = new LocalStorage("player")
  playerLocalStorage.init();

  const [player, setPlayer] = useState(playerLocalStorage.getItem().data)

  useEffect(() => {
    // 记录到本地
    playerLocalStorage.setItem({
      ...playerLocalStorage.getItem(),
      data: player
    })
  }, [player])

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
    },);
  };

  const onShareClick = () => {

  }

  return (
    <div style={{width: 1050, height: 580}}>
      <Button onClick={onShareClick}>分享链接</Button>
      <Button onClick={onShareClick}>分享</Button>
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
