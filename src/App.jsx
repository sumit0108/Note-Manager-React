import { NoteApi } from "api/note-api";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setNoteList } from "store/notes/notes-slice";
import s from "./style.module.css";
import { withAuthRequired } from "hoc/withAuthRequired";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";

export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchAllNoted() {
    const noteList = await NoteApi.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    fetchAllNoted();
  }, []);

  return (
    <div>
      <Header />

      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/")}
          style={{ marginTop: 5, marginLeft: 5, position: "absolute" }}
        >
          Home
        </button>
      </div>

      <div className={s.workspace}>
        <Outlet />
        <div className="col-xs-12 col-sm-8 text-end">
          <ButtonPrimary
            onClick={() => navigate("/note/new")}
            className={s.buttonAdd}
          >
            +
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
export const ProtectedApp = withAuthRequired(App);
