import * as mailer from "./services/Mailer";
import * as job from "./services/Job";
import * as runner from "./services/Runner";
import * as data from "./services/Data";
import * as ai from "./services/AI";
import {
    getAiModeEmailResponses,
    getLeanDataContactExplanatoryPrompts,
    getLeanDataFile,
} from "./config/data";

// Examples
// send dummy email
await mailer.dummy();

// apply for 1 job
await job.apply(1);

// apply a callback over the lean data
await data.leanMap((c) => {
    c.email.forEach((e) => (e.value = e.value?.toLowerCase()));
});

// generate prompts
let template = await getLeanDataContactExplanatoryPrompts();
let companies = await getLeanDataFile();

// get ai responses file regarding additional company emails
let responses = await getAiModeEmailResponses();

// console.log(companies.candidates[0]);
// console.log(responses[0]);

// merge emails from ai response and current dataset for 50 companies starting from index 0
await data.mergeEmailValues(0, 50);

ai.generateAllPrompts();
await data.aiEmailResponsesMap((c) => {
    c.email.forEach((e) => (e.value = e.value?.toLowerCase()));
});
