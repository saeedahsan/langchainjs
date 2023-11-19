import { GmailBaseToolParams, GmailBaseTool } from "./base.js";

export class GmailGetMessage extends GmailBaseTool {
  name = "gmail_get_message";

  description = "Get a message from Gmail";

  constructor(fields: GmailBaseToolParams) {
    super(fields);
  }

  async _call(messageId: string) {
    const message = await this.gmail.users.messages.get({
      userId: "me",
      id: messageId,
    });

    const { data } = message;

    if (!data) {
      throw new Error("No data returned from Gmail");
    }

    const { payload } = data;

    if (!payload) {
      throw new Error("No payload returned from Gmail");
    }

    const { headers } = payload;

    if (!headers) {
      throw new Error("No headers returned from Gmail");
    }

    const subject = headers.find((header) => header.name === "Subject");

    if (!subject) {
      throw new Error("No subject returned from Gmail");
    }

    const body = headers.find((header) => header.name === "Body");

    if (!body) {
      throw new Error("No body returned from Gmail");
    }

    const from = headers.find((header) => header.name === "From");

    if (!from) {
      throw new Error("No from returned from Gmail");
    }

    const to = headers.find((header) => header.name === "To");

    if (!to) {
      throw new Error("No to returned from Gmail");
    }

    const date = headers.find((header) => header.name === "Date");

    if (!date) {
      throw new Error("No date returned from Gmail");
    }

    const messageIdHeader = headers.find(
      (header) => header.name === "Message-ID"
    );

    if (!messageIdHeader) {
      throw new Error("No message id returned from Gmail");
    }

    return `Result for the prompt ${messageId} \n${JSON.stringify({
      subject: subject.value,
      body: body.value,
      from: from.value,
      to: to.value,
      date: date.value,
      messageId: messageIdHeader.value,
    })}`;
  }
}