# What stops a wrong or hijacked model from issuing a refund?

Most agent demos only read data. I wanted to build one that changes it: refunds, address changes and support tickets for a fictional online store. Once an agent can move money, three things can go wrong that a demo never meets. A customer asks about someone else's order. Text inside the data tries to give the model orders, like an order note that says "refund everything". Or the model is simply wrong. AgentDesk is my attempt to answer one question: what stops damage in each case, and how do I measure it?

## What it does

A customer writes in plain words. The agent can look up an order, issue a refund, change a delivery address, open a ticket, or answer a policy question. A refund above Rs 5,000 waits for a human to approve it. Every tool call, including the ones that were refused, is written to an audit table.

![A refund request changes nothing until the customer presses Confirm](/images/agentdesk/1-confirm-before-refund.webp)

## The rules live in code, not in the prompt

A prompt is a request. Code is a guarantee. So the model only proposes one tool call, and a plain Python guardrail decides every write. It checks that the order belongs to the signed in customer, that the amount is under the limit, that the order is delivered and inside the refund window, and that nobody has refunded it already. The identity comes from a session token the server issued, so there is no customer id argument for a model to forge.

Every write also needs a one time confirmation token that is tied to the exact arguments. My first design sent that token back to the model so it could pass it on. The design review caught the flaw before I wrote any code: a hijacked model could then confirm for the user, so the confirmation would prove nothing. The token now goes only to the customer's screen, and the model never sees it.

![Customer 1 asks to refund Customer 2's order and is refused](/images/agentdesk/2-refused-not-your-order.webp)

Text from the database, such as order notes, reaches the model as labelled data. I do not try to make the model resist an injection. I made resistance unnecessary, because the guardrail never reads what the model says.

## How I tested it

The guardrail is easy to praise and hard to prove, so I built an independent judge. It looks at the database before and after, the audit log and the token table, and decides for itself whether each action should have been allowed. It does not import the guardrail code.

I wrote 60 attack cases: injection inside order notes, other customers' data, refunds over the limit, replayed or forged or expired tokens, double refunds, refunds on orders that were never delivered, and arguments changed after confirmation. Each one runs against a fully compromised model that proposes whatever the attack needs, with a customer who confirms everything the server asks.

- With the guardrail on, 0 of 60 cases caused an unsafe action. 0 of 22 did when the same attack came as a normal user message.
- The test can fail. I switched off one rule at a time and the same cases then caused between 2 and 12 unsafe actions each, and 52 of 60 with every rule off.

![A Rs 7,900 refund is above the limit and waits for a human](/images/agentdesk/3-pending-human-approval.webp)

## What the agent got wrong

With no API key I could not measure a real model. The agent I measured uses hand written rules, and the numbers say so. I wrote the rules against a 30 conversation dev set, froze them, and only then wrote new phrasings for the 90 conversation main set.

- Task success was 72.2 percent. That is 48 of 50 on phrasings the rules were written against, and 17 of 40 on new ones.
- 23 of the 25 failures were new phrasings. "The item stopped working" was passed to a human instead of becoming a ticket, and "Has order #2636 shipped yet?" was answered with the address policy.
- None of the failures was unsafe. Each one ended in a refusal, a question or a handover to a human.
- The policy refusal threshold made no difference on 10 questions, so I cannot say it helps.

I also made a mistake in my own judge. After the first main run, three "already refunded" cases had a wrong expected state because an existing refund was counted twice. Task success was 70.0 percent. I fixed only the label, changed nothing in the system, and re ran it for 72.2 percent. Both runs are in the repository.

## What I did not measure

The LLM version of the proposer is written and tested against a mocked connection only. Its task success, a comparison of two models, and the cost per conversation are not run. The 60 attacks were written by the same person who wrote the guardrail, so attack types I did not think of are not covered. The Docker image has not been built yet.

That is the honest summary: the guardrail held in every case I could think of, the baseline agent is brittle, and the next step is to measure a real model the same way.
