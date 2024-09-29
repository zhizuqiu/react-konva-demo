import uuid from 'react-uuid';
import {Player} from "@/pages/Drag/Player";

type LocalStorageDataType = {
  uuid: string;
  data: Player;
}

interface LocalStorageInterface {
  key: string;
  localStorageData: LocalStorageDataType | null;
  getItem: () => LocalStorageDataType;
  setItem: (value: LocalStorageDataType) => void;
}

const InitLocalStorageData = {
  uuid: "",
  data: {
    isDragging: false,
    x: 50,
    y: 50,
  },
}

class LocalStorage implements LocalStorageInterface {
  key: string;
  localStorageData: LocalStorageDataType | null;

  constructor(key: string) {
    this.key = key;
    this.localStorageData = null;
  }

  init() {
    this.localStorageData = this.getItem();
  }

  getItem() {
    let item = this.localStorageData;
    if (item === null) {
      const itemStr = localStorage.getItem(this.key)
      if (!itemStr) {
        item = InitLocalStorageData;
      } else {
        item = JSON.parse(itemStr);
        if (!item) {
          item = InitLocalStorageData;
        }
      }
      if (!item.uuid) {
        item.uuid = uuid();
      }
      this.setItem(item);
    }
    return item;
  }

  setItem(value: LocalStorageDataType) {
    this.localStorageData = value;
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}

export default LocalStorage;
