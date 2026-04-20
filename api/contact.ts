import { handleContactRequest } from "./contact-handler";

export default {
  fetch(request: Request): Promise<Response> {
    return handleContactRequest(request, process.env);
  },
};
