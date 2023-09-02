import { put, all, call, take } from "redux-saga/effects";
import { fetchStart, fetchSuccess, fetchFailure } from "./slices/clothesSlice";
import axios from "axios";
import { ClothesType } from "../utils/types";

function* fetchClothes() {
  try {
    yield put(fetchStart());
    const data: ClothesType = yield call(async () => {
      const response = await axios.get(
        "http://www.mocky.io/v2/5e3940013200005e00ddf87e?mocky-delay=600ms"
      );
      return response.data;
    });
    yield put(fetchSuccess(data));
  } catch (error) {
    yield put(fetchFailure());
  }
}

function* watchFetchClothes() {
  yield take("app/start");
  yield call(fetchClothes);
}

export default function* rootSaga() {
  yield all([watchFetchClothes()]);
}
