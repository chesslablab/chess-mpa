import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

sessionStorage.clear();

try {
  await Promise.all([
  	binaryWebSocket.connect(),
  	analysisWebSocket.connect()
  ]);
} catch {}

analysisWebSocket.send('/start', {
  variant: variant.CLASSICAL,
  mode: mode.ANALYSIS
});
