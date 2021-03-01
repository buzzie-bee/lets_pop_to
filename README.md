# Lets Pop To

This is an inspirational flight finding app powered by the skyscanner api and images sourced from flickr.

You can see a live version at [https://www.letspop.to](https://www.letspop.to/)

## Running locally

Clone the repo using:

`git clone https://github.com/buzzie-bee/lets_pop_to`

and

`npm install`

then

`npm-start`

## Running cloud functions locally

The cloned repo has the live api endpoints already from the cloud functions.

If you wish to implement them youself a brief outline of the steps involved is below. Please contact me if you require further information.

##

Create a firebase project with a firestore:
[https://firebase.google.com/docs/web/setup](https://firebase.google.com/docs/web/setup)

##

To set up your own version of the cloud functions you will need to store the skyscanner and airhex api keys in your cloud functions env.

I aquired the skyscanner keys from rapidapi.

Airhex only provide demo keys for testing.

`{ "skyscanner": { "key": SKYSCANNER_KEY, "host": SKYSCANNER_HOST }, "airhex": { "key": AIRHEX_KEY } }`

##

To run locally with your own functions you will also need to catalogue the flight image data. See my lets-pop-to-data-entry repo for further information on how you can do this.

## Any questions?

Get in touch with me if you have any questions about this, feel free to post issues or make pull requests if you wish to add features.
