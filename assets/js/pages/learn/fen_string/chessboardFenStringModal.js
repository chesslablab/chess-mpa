import Modal from 'bootstrap/js/dist/modal.js';
import { fenWebSocket } from '../../../FenWebSocket.js';
import * as mode from '../../../../mode.js';

const chessboardFenStringModal = {
  modal: new Modal(document.getElementById('chessboardFenStringModal')),
  form: document.querySelector('#chessboardFenStringModal form')
}

chessboardFenStringModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const add = {
    fen: event.target.elements[1].value
  };
  fenWebSocket.send(`/start ${event.target.elements[0].value} ${mode.FEN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  chessboardFenStringModal.modal.hide();
});

export default chessboardFenStringModal;
