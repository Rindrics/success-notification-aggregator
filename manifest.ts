import { Manifest } from "deno-slack-sdk/mod.ts";
import { RegisterMessageWorkflow } from "./workflows/register_message_workflow.ts";

export default Manifest({
    name: "success-notification-aggregator",
    description: "Consolidates success notifications into a single, reliable report",
    icon: "assets/default_new_app_icon.png",
    workflows: [RegisterMessageWorkflow],
    outgoingDomains: [],
    botScopes: ["commands", "chat:write", "chat:write.public"],
});
