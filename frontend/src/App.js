import logo from "./logoPS.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Alert, Col, Container, Row, Image } from "react-bootstrap";
import SearchForm from "./components/SearchForm";
import PaginationBar from "./components/PaginationBar";
import { useDispatch, useSelector } from "react-redux";
import MemeUploader from "./components/MemeUploader";
import MemeList from "./components/MemeList";
import memesListActions from "./redux/actions/memesList.actions";
import Toast from "./components/Toast";
// import {useHistory} from 'react-router-dom'

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const App = () => {
  const memes = useSelector((state) => state.memesListData.memes);
  const [pageNum, setPageNum] = useState(1);
  const totalPages = useSelector((state) => state.memesListData.totalPages); //refers to line 58 in meme.controller.js
  const [limit, setLimit] = useState(5); //allow user to change limit query
  const loading = useSelector((state) => state.memesListData.loading);
  const [searchInput, setSearchInput] = useState();
  const [query, setQuery] = useState("");
  const errorMessage = useSelector((state) => state.memesListData.error);

  const dispatch = useDispatch();

  // const history = useHistory();
  // const handleClickBook = (memeId) => {
  //   history.push(`/memes/${memeId}`)
  // }


  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  }; //use this in input with default 10 limit with no submit

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  useEffect(() => {
    dispatch(memesListActions.getMemes(pageNum, limit, query));
  }, [pageNum, limit, query, dispatch]);

  return (
    <div className="App">
      <Container>
        <Row className="justify-content-around">
          <Col className="align-self-center" sm={8}>
            {errorMessage && <Toast message={errorMessage} />}
            <SearchForm
              loading={loading}
              searchInput={searchInput}
              handleSearchChange={handleSearchInputChange}
              handleSubmit={handleSubmit}
            />
          </Col>
          <Col>
            <PaginationBar
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPageNum={totalPages}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <MemeUploader />
          </Col>
          <Col>
            <MemeList memes={memes} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
