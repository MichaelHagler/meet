Feature: Specify Number Of Events

Scenario: When a user has not specified number of events let the default be 32
Given the user did not specify the number of events
When selecting cities
Then default number of 32 is loaded

Scenario: User changes the number of events
Given that the user does not want to see all events
When user changes the number of events in the input box
Then user will see the number of events they want to see
