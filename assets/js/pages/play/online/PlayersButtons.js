import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm';
import { jwtDecode } from 'jwt-decode';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

export class PlayersButtons extends AbstractComponent {
  mount() {
    this.el.replaceChildren();
    if (this.props.games.length > 0) {
      this.props.games.forEach(game => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'w-100', 'rounded-0');
        button.textContent = `${game.username[game.color]} ${game.elo[game.color] ? (game.elo[game.color]) : ''} ${game.variant.charAt(0).toUpperCase() + game.variant.slice(1)} ${game.min}+${game.increment} ${game.color}`;
        if (sessionStorage.getItem('start_token') !== game.jwt) {
          button.addEventListener('click', () => {
            const accessToken = jsCookie.get('access_token') ? jwtDecode(jsCookie.get('access_token')) : null;
            playWebSocket.send('/accept', {
              hash: game.hash,
              username: accessToken ? accessToken.username : null,
              elo: accessToken ? accessToken.elo : null
            });
          });
        } else {
          button.disabled = true;
        }
        this.el.appendChild(button);
      });
    }
  }
}

export const playersButtons = new PlayersButtons(
  document.getElementById('playersButtons'),
  {
    games: []
  }
);
