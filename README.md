
# TeamUp

## Introduction

TeamUp! is a web app to help simplify the group formation process for UTD's CS 4485 Senior Design course. Our portal will allow students to interact with other students to form project groups, as well as input their individual and team preferences for a project.

## Backend Documentation

### How to run server:

> Note: for these instructions to work, you must add a file called config.env to the server directory. This file must configure ATLAS_URI and TOKEN_KEY values.

    cd server
    npm run app

  
### API Documentation:

View all available API requests for these schemas with sample responses [here](https://documenter.getpostman.com/view/10655805/2s93CNNtJy).

Schemas currently stored in our MongoDB database:

- User
	- first_name
	- last_name
	- password
	- email
	- address
	- project_preferences
	- skills
	- extra_information
	- token

- Team
	- team_number
	- members
	- is_public
	- is_finalized
	- team_project_preferences

- Project
	- name
	- number
	- desired_skills
	- sponsor