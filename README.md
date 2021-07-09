# Abercrombie Client-Side Developer Skill Assessment
# Solution for exercices

***
# Setup

1.To run tasks in browser open corresponding index.html file from folders exercise-1 and exercise-2.
2.To run tests for the first exercise open file test.html from tests folder in browser.

# Notes

Unfortunately, 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment' didn't work and I had to use 'https://reqres.in/api/users'.
It provided me with a list of users (very similar to 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment' ), but there were no fields 'name' and 'createdAt'. I used fields first_name and last_name to show expected field name and replaced createdAt with email field.

## Exercise 1: Consuming RESTful API data
1. Used fetch API for Query https://5dc588200bbd050014fb8ae1.mockapi.io/assessment list of users.
2. Printed received list of users to the DOM in an unordered list.
    * Used [Handlebars](https://handlebarsjs.com/) to render the data
    * Each list item shows user name, avatar, email, and ID
3. Wrote unit tests for JS, using the QUnit
4. Each user-card shows name and avatar by default; It has a button that reveals the ID and email on click.

***

## Exercise 2: Task Tracker Enhancement
[Task Tracker](./exercise-2/index.html)
#### Fixes
1. Broke the contents of the HTML file into pieces that follow a logical separation of concerns for the browser.
2. Fixed any invalid HTML
3. Fixed any JS errors / inefficiencies.
4. Prevented pollution of the global object with app code

#### Features
1. Made the form keyboard-accessible (You can press button "Enter" to create new task if the form contains any text)
2. Added support for localStorage such that refreshing the page does not reset your task list
3. Added form validation such that an empty task cannot be submitted.
4. Converted float-based layouts to flexbox-based layouts. The visuals should not change, just the CSS that handles the layout.
5. Made the design responsive, such that -
    * The form fills 100% width of the screen up until 375px wide
    * The form becomes centered in the page after 375px
    * There should be no horizontal scroll bars present at any width
