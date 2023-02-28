# meet

Meet App

This app uses a TDD (test-driven development) technique. The app uses the Google Calendar API and users will be able to see upcoming events in their city.h

Exercise 4.1 stories and scenarios

Feature 2:

As a user,
They should see a collapsed menu by default,
So that they can expand it for more details.

As a user,
They should be able to expand the event details,
So that they can gain more info about the event.

As a user,
They should be able to minimize the event details,
So that they can hide the details of the event.

GHERKIN: 
Given: user saw a collapsed menu
When: the user looks at an event
Then: the user can expand and hide event details

Feature 3:

As a user,
They should see all 32 events by default,
So that they can see all events.

As a user,
They should be able to change the number of events shown,
So that they can see a specific amount of events.

GHERKIN: 
Given: the user did not specify the number of events
When: the user sees 32 events by default
Then: the user can choose how many events they see

Feature 4:

As a user, 
Their events should be cached,
So that they can see their events offline.

As a user,
They should see an error when changing settings,
So that they can be aware that they are offline.

GHERKIN: 
Given: the user had events cached
When: the user sees events
Then: the user will see an error if they try to change settings

Feature 5:

As a user,
They should see a chart with upcoming events in each city,
So that they can quickly see the number of events in different cities.

GHERKIN: 
Given: user saw a chart of upcoming events in each city
When: the user looks at the data visualization
Then: the user can quickly see where and how many events there are in each city
