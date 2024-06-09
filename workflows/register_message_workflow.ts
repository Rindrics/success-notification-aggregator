import { DefineWorkflow } from "deno-slack-sdk/mod.ts";

export const RegisterMessageWorkflow = DefineWorkflow({
  callback_id: "register_message_workflow",
  title: "Register Message",
  description: "Add ID to the incoming success notification and register it to Datastore",
});
