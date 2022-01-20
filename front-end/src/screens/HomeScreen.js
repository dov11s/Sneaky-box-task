import React, { useEffect, useState } from "react";
import services from "../services";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";

const HomeScreen = () => {
  const [cities, setCities] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [description, setDescription] = useState(false);

  const [deleteList, setDeleteList] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseForDelete = () => {
    window.location.reload(false);
    setShowDelete(false);
  };
  const handleShowForDelete = () => {
    setDeleteList(selected);
    setShowDelete(true);
  };

  const fetchPosts = async () => {
    try {
      const data = await services.getAllCities();
      setCities(data.data);
    } catch (error) {
      alert("Failed to fetch cities.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const columns = [{ dataField: "name", text: "City" }];

  let selected = [];

  const selectRow = {
    mode: "checkbox", // single row selection
    onSelect: (row, isSelect, rowIndex, e) => {
      const index = selected.indexOf(row.code);
      console.log(index);
      if (index != -1) {
        selected.splice(index, 1);
      } else {
        selected.push(row.code);
      }
      console.log(row);
    },
    onSelectAll: (isSelect, rows, e) => {
      rows.forEach((x) => {
        console.log(x);
        const index = selected.indexOf(x.code);
        if (index != -1) {
          selected.splice(index, 1);
        } else {
          selected.push(x.code);
        }
      });
    },
  };

  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      setModalInfo(row);
      setDescription(row.description.length != 0);
      toggleTrueFalse();
    },
  };

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = tomorrow.toISOString().slice(0, 10);

  const ModalContent = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h1 class="centerText">{modalInfo.name} information:</h1>
          {description ? <h3>Description: {modalInfo.description}</h3> : null}

          <h3>Weather-forecast for {tomorrow}</h3>
          <h3>Min temperature: {modalInfo.minTemp}</h3>
          <h3>Max temperature: {modalInfo.maxTemp}</h3>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  };

  const ModalContent2 = () => {
    return (
      <Modal show={showDelete} onHide={handleCloseForDelete}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h1 class="centerText">Do you want to delete:</h1>

          <Button size="lg" variant="success" onClick={deleteCities}>
            Yes
          </Button>
          <Button size="lg" variant="danger" onClick={handleCloseForDelete}>
            No
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  };

  const deleteCities = async () => {
    await Promise.all(
      deleteList.map(async (x) => {
        let data = await services.deleteCity(x);
      })
    );
    handleCloseForDelete();
  };

  return (
    <div className="App">
      <br />
      <br />
      <h1 id="centered">User cities</h1>
      <br />
      <br />
      <BootstrapTable
        hover
        className=".table-hover"
        keyField="name"
        data={cities}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
        selectRow={selectRow}
      />

      {show ? <ModalContent /> : null}
      {showDelete ? <ModalContent2 /> : null}
      <div class="row react-bootstrap-table-pagination">
        <Button onClick={handleShowForDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default HomeScreen;
