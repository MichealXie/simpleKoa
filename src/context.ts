import { IncomingMessage, ServerResponse } from 'http';

export default function context(request: IncomingMessage, response: ServerResponse) {
  return {
    req: request,
    res: response,
  }
}
