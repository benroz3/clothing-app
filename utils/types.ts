export interface ClothesType {
  results: {
    id: number;
    type: string;
    name: string;
    colors: string[];
    sizes: number[] | string[];
    brand: string;
  }[];
}

export interface SingleClothesType {
  id: number;
  type: string;
  name: string;
  colors: string[];
  sizes: number[] | string[];
  brand: string;
}

export interface ChosenClothesType {
  id: number;
  type: string;
  name: string;
  colors: string;
  sizes: number | string;
  brand: string;
}

export interface RootState {
  clothes: {
    clothes: ClothesType;
    isFetching: boolean;
    error: boolean;
  };
  sets: {
    setsArray: {
      shirt: ChosenClothesType;
      pants: ChosenClothesType;
      shoes: ChosenClothesType;
    }[];
    currentShirt: ChosenClothesType | null;
    currentPants: ChosenClothesType | null;
    currentShoes: ChosenClothesType | null;
    status: number;
  };
}

export interface SetsStateType {
  setsArray: {
    shirt: ChosenClothesType;
    pants: ChosenClothesType;
    shoes: ChosenClothesType;
  }[];
  currentShirt: ChosenClothesType | null;
  currentPants: ChosenClothesType | null;
  currentShoes: ChosenClothesType | null;
  status: number;
}
