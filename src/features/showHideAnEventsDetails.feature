Feature: Show and hide event details

Scenario: User should see an events details collapsed by default
Given user has not seen event details
When user sees a button to expand details
Then the user can expand for more details

Scenario: User can hide event details
Given user has seen event details
When user has expanded details
Then the user can hide event details
