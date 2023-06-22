import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { App, ProtectedApp } from "App";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NoteBrowser, ProtectedNoteBrowse } from "pages/NoteBrowse/NoteBrowser";
import { NoteCreate } from "pages/NoteCreate/NoteCreate";
import { PageNoteFound } from "pages/PageNoteFound/PageNoteFound";
import { Note } from "pages/Note/Note";
import { SignIn } from "pages/Signin/SignIn";
import { Signup } from "pages/Signup/Signup";
import { FirebaseApp } from "utils/firebase";
import { PersistGate } from "redux-persist/integration/react";

FirebaseApp.init();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedApp />}>
              <Route path="/" element={<NoteBrowser />} />
              {/* <Route path="/" element={<ProtectedNoteBrowse />} />  Now you don't
              have to protect every component just protect App component */}
              <Route path="/note/:noteId" element={<Note />} />
              <Route path="/note/new" element={<NoteCreate />} />
              <Route path="*" element={<PageNoteFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
