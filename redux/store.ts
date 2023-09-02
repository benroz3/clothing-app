import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import clothesReducer from "./slices/clothesSlice";
import setsReducer from "./slices/setsSlice";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    clothes: clothesReducer,
    sets: setsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export default store;
